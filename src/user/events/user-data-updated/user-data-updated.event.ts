import { IEvent } from '@nestjs/cqrs';
import { User } from 'src/user/models/user.model';

export class UserDataUpdatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
