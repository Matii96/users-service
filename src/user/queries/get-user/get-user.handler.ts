import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from 'src/repository/user.entity';
import { GetUserDto } from 'src/user/dto/get.dto';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  public constructor(@InjectModel(UserEntity) private userModel: typeof UserEntity) {}

  public async execute(query: GetUserQuery): Promise<GetUserDto> {
    return {
      id: query.user.id,
      name: query.user.name,
      fullName: query.user.fullName,
      description: query.user.description,
      email: query.user.email,
      lang: query.user.lang,
      active: query.user.active,
      emailNotification: query.user.emailNotification,
      createdAt: query.user.createdAt,
      updatedAt: query.user.updatedAt
    };
  }
}
