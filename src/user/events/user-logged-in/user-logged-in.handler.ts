import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { LoginHistoryEntity } from 'src/repository/user-login-history.model';
import { UserLoggedInEvent } from './user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent> {
  private logger = new Logger(UserLoggedInHandler.name);

  public constructor(@InjectModel(LoginHistoryEntity) private readonly loginHistoryEntity: typeof LoginHistoryEntity) {}

  public async handle(event: UserLoggedInEvent) {
    await this.loginHistoryEntity.create({
      address: event.req.headers['x-forwarded-for'] || event.req.connection.remoteAddress,
      browser: event.req.headers['user-agent'],
      userId: event.user.entity.id
    });

    this.logger.log(`User ${event.user.entity.name} logged in`);
  }
}
