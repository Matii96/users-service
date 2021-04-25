import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, ValidationErrorItem } from 'sequelize';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { LoginHistory } from './models/user-login-history.model';
import { User } from './models/user.model';
import { UserLoginHistoryDto } from './dto/login-history.dto';
import { ModifyUserDto } from './dto/modify.dto';
import { GetUserDto } from './dto/get.dto';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserSimpleService {
  public constructor(
    private config: ConfigService,
    private sequelize: Sequelize,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(LoginHistory) private loginHistoryModel: typeof LoginHistory
  ) {}

  public async GetUser(user: User): Promise<GetUserDto> {
    return {
      id: user.id,
      name: user.name,
      fullName: user.fullName,
      description: user.description,
      hash: user.hash,
      email: user.email,
      lang: user.lang,
      active: user.active,
      emailNotification: user.emailNotification,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  public async List(): Promise<GetUserDto[]> {
    const users = await this.userModel.findAll({ raw: true });
    return <GetUserDto[]>users;
  }

  public async GetLoginHistory(userId: number): Promise<UserLoginHistoryDto[]> {
    const history = await this.loginHistoryModel.findAll({ where: { userId } });
    return history.map(entry => ({ address: entry.address, browser: entry.browser }));
  }

  public async Login(req: Request, data: LoginInputDto): Promise<LoginDto> {
    const user: User = await this.userModel.findOne({
      attributes: ['id', 'name', 'fullName', 'email', 'hash', 'password', 'lang'],
      where: {
        [Op.or]: [{ name: data.nameOrEmail }, { email: data.nameOrEmail }],
        password: { [Op.ne]: null },
        active: true
      }
    });

    if (!user || !user.ComparePassword(data.password)) {
      throw new UnauthorizedException();
    }

    await LoginHistory.create({
      address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      browser: req.headers['user-agent'],
      userId: user.id
    });

    const userData: LoginUserDto = {
      hash: user.hash,
      name: user.name,
      fullName: user.fullName,
      email: user.email,
      lang: user.lang
    };

    const jwt = sign(userData, this.config.get<string>('authentication.jwtSecret'), {
      expiresIn: this.config.get<number>('authentication.expiresIn')
    });

    return { ...userData, jwt };
  }

  public async CreateUser(data: ModifyUserDto): Promise<GetUserDto> {
    let user: User;
    try {
      user = await this.userModel.create(data, { raw: true });
    } catch (err) {
      this.HandleDatabaseError(err);
    }
    return <GetUserDto>user;
  }

  public async UpdateUser(userId: number, data: ModifyUserDto) {
    return this.sequelize.transaction(async t => {
      try {
        await this.userModel.update(data, { where: { id: userId }, transaction: t });
      } catch (err) {
        this.HandleDatabaseError(err);
      }
      return this.userModel.findByPk(userId, { transaction: t, raw: true });
    });
  }

  public async RemoveUser(userId: number) {
    await this.userModel.destroy({ where: { id: userId } });
    return userId;
  }

  private HandleDatabaseError(err: any): void {
    const errors: ValidationErrorItem[] = err.errors;
    if (!(errors && errors[0] instanceof ValidationErrorItem)) {
      throw err;
    }
    throw new BadRequestException(errors[0].message);
  }
}
