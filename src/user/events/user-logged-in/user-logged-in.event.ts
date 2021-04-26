import { IEvent } from '@nestjs/cqrs';
import { User } from 'src/user/models/user.model';
import { Request } from 'express';

export class UserLoggedInEvent implements IEvent {
  constructor(public readonly user: User, public readonly req: Request) {}
}
