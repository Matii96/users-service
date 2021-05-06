import { AggregateRoot } from '@nestjs/cqrs';
import { User } from 'src/entities/user.entity';

export class UserAggregate extends AggregateRoot {
  public constructor(public readonly data: User) {
    super();
  }

  public FormatData() {
    return {
      id: this.data.id,
      name: this.data.name,
      fullName: this.data.fullName,
      description: this.data.description,
      email: this.data.email,
      lang: this.data.lang,
      active: this.data.active,
      emailNotification: this.data.emailNotification,
      createdAt: this.data.createdAt,
      updatedAt: this.data.updatedAt
    };
  }
}
