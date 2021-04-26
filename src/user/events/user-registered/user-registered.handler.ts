import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from './user-registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler implements IEventHandler<UserRegisteredEvent> {
  private logger = new Logger(UserRegisteredHandler.name);

  public async handle(event: UserRegisteredEvent) {
    this.logger.log(`User ${event.user.entity.name} has been registered`);
  }
}
