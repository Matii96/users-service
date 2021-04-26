import { AggregateRoot } from '@nestjs/cqrs';
import { Request } from 'express';
import { UserEntity } from 'src/repository/user.entity';
import { UserDataUpdatedEvent } from '../events/user-data-updated/user-data-updated.event';
import { UserLoggedInEvent } from '../events/user-logged-in/user-logged-in.event';
import { UserRegisteredEvent } from '../events/user-registered/user-registered.event';

export class User extends AggregateRoot {
  public constructor(public readonly entity: UserEntity) {
    super();
  }

  public register() {
    this.apply(new UserRegisteredEvent(this));
  }

  public updateData() {
    this.apply(new UserDataUpdatedEvent(this));
  }

  public login(req: Request) {
    this.apply(new UserLoggedInEvent(this, req));
  }
}
