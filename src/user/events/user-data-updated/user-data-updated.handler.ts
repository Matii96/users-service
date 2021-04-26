import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDataUpdatedEvent } from './user-data-updated.event';

@EventsHandler(UserDataUpdatedEvent)
export class UserDataUpdatedHandler implements IEventHandler<UserDataUpdatedEvent> {
  private logger = new Logger(UserDataUpdatedHandler.name);

  public async handle(event: UserDataUpdatedEvent) {
    this.logger.log(`User ${event.user.entity.name} data has been updated`);
  }
}
