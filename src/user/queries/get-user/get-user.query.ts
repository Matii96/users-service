import { IQuery } from '@nestjs/cqrs';
import { UserEntity } from 'src/repository/user.entity';

export class GetUserQuery implements IQuery {
  public constructor(public user: UserEntity) {}
}
