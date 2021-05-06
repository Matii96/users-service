import { IQuery } from '@nestjs/cqrs';
import { UserAggregate } from 'src/user/models/user.model';

export class GetUserQuery implements IQuery {
  public constructor(public user: UserAggregate) {}
}
