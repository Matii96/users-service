import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { UserCommandController } from './user-command.controller';
import { UserQueryController } from './user-query.controller';
import { UserQueryHandlers } from './queries';
import { UserCommandHandlers } from './commands';
import { UserEntities } from 'src/entities';

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature(UserEntities), DatabaseModule],
  controllers: [UserQueryController, UserCommandController],
  providers: [...UserQueryHandlers, ...UserCommandHandlers]
})
export class UserModule {}
