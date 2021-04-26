import { UnauthorizedException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/repository/user.entity';
import { LoginQuery } from './login.query';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginDto } from 'src/user-simple/dto/login.dto';
import { LoginHistoryEntity } from 'src/repository/user-login-history.model';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  public constructor(private config: ConfigService, @InjectModel(UserEntity) private userModel: typeof UserEntity) {}

  public async execute(query: LoginQuery): Promise<LoginDto> {
    const user = await this.userModel.findOne({
      attributes: ['id', 'name', 'fullName', 'email', 'password', 'lang'],
      where: {
        [Op.or]: [{ name: query.data.nameOrEmail }, { email: query.data.nameOrEmail }],
        password: { [Op.ne]: null },
        active: true
      }
    });

    if (!user || !user.ComparePassword(query.data.password)) {
      throw new UnauthorizedException();
    }

    await LoginHistoryEntity.create({
      address: query.req.headers['x-forwarded-for'] || query.req.connection.remoteAddress,
      browser: query.req.headers['user-agent'],
      userId: user.id
    });

    const userData: LoginUserDto = {
      name: user.name,
      fullName: user.fullName,
      email: user.email,
      lang: user.lang
    };
    return { ...userData, jwt: this.CreateJwt(userData) };
  }

  private CreateJwt(data: LoginUserDto): string {
    return sign(data, this.config.get<string>('authentication.jwtSecret'), {
      expiresIn: this.config.get<number>('authentication.expiresIn')
    });
  }
}
