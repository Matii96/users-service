import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { UserCommandController } from './user-command.controller';
import { UserQueryController } from './user-query.controller';
import { LoginHistoryEntity } from 'src/repository/user-login-history.model';
import { UserEntity } from 'src/repository/user.entity';
import { UserQueryHandlers } from './queries';
import { UserCommandHandlers } from './commands';

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([UserEntity, LoginHistoryEntity]), DatabaseModule],
  controllers: [UserQueryController, UserCommandController],
  providers: [...UserQueryHandlers, ...UserCommandHandlers]
})
export class UserModule {}
