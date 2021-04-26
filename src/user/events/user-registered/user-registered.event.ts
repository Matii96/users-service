import { IEvent } from '@nestjs/cqrs';
import { User } from 'src/user/models/user.model';

export class UserRegisteredEvent implements IEvent {
  constructor(public readonly user: User) {}
}
