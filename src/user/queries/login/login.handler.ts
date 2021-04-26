import { UnauthorizedException } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/repository/user.entity';
import { LoginQuery } from './login.query';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginDto } from 'src/user-simple/dto/login.dto';
import { User } from 'src/user/models/user.model';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  public constructor(
    private config: ConfigService,
    private readonly publisher: EventPublisher,
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

    const userData: LoginUserDto = {
      name: userEntity.name,
      fullName: userEntity.fullName,
      email: userEntity.email,
      lang: userEntity.lang
    };

    const user = this.publisher.mergeObjectContext(new User(userEntity));
    user.login(query.req);
    user.commit();

    return { ...userData, jwt: this.CreateJwt(userData) };
  }

  private CreateJwt(data: LoginUserDto): string {
    return sign(data, this.config.get<string>('authentication.jwtSecret'), {
      expiresIn: this.config.get<number>('authentication.expiresIn')
    });
  }
}
