import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from 'src/repository/user.entity';
import { ListUsersQuery } from './list-users.query';
import { GetUserDto } from 'src/user/dto/get.dto';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  public constructor(@InjectModel(UserEntity) private userModel: typeof UserEntity) {}

  public async execute(): Promise<GetUserDto[]> {
    const users = await this.userModel.findAll({ raw: true });
    return <GetUserDto[]>users;
  }
}
