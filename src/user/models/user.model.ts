import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from 'src/repository/user.entity';

export class User extends AggregateRoot {
  constructor(public readonly entity: UserEntity) {
    super();
  }

  public register() {
    // this.apply(new UserRegisteredEvent(this.id, itemId));
  }
}
