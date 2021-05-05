import { UnauthorizedException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/repository/user.entity';
import { LoginQuery } from './login.query';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginHistoryEntity } from 'src/repository/user-login-history.model';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  public constructor(
    private config: ConfigService,
    @InjectModel(LoginHistoryEntity) private loginHistoryEntity: typeof LoginHistoryEntity,
    @InjectModel(UserEntity) private userModel: typeof UserEntity
  ) {}

  public async execute(query: LoginQuery): Promise<LoginDto> {
    const userEntity = await this.userModel.findOne({
      attributes: ['id', 'name', 'fullName', 'email', 'password', 'lang'],
      where: {
        [Op.or]: [{ name: query.data.nameOrEmail }, { email: query.data.nameOrEmail }],
        password: { [Op.ne]: null },
        active: true
      }
    });

    if (!userEntity || !userEntity.ComparePassword(query.data.password)) {
      throw new UnauthorizedException();
    }

    await this.AddToHistory(userEntity.id, query.req);

    const userData: LoginUserDto = {
      name: userEntity.name,
      fullName: userEntity.fullName,
      email: userEntity.email,
      lang: userEntity.lang
    };

    return { ...userData, jwt: this.CreateJwt(userData) };
  }

  private CreateJwt(data: LoginUserDto): string {
    return sign(data, this.config.get<string>('authentication.jwtSecret'), {
      expiresIn: this.config.get<number>('authentication.expiresIn')
    });
  }

  private async AddToHistory(userId: number, req: Request) {
    return this.loginHistoryEntity.create({
      address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      browser: req.headers['user-agent'],
      userId
    });
  }
}
