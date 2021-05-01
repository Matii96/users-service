import { IQuery } from '@nestjs/cqrs';
import { User } from 'src/user/models/user.model';

export class GetUserQuery implements IQuery {
  public constructor(public user: User) {}
}
