import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSimpleService } from './user-simple.service';
import { UserSimpleController } from './user-simple.controller';
import { LoginHistorySimple } from './models/user-login-history.model';
import { UserSimple } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserSimple, LoginHistorySimple])],
  providers: [UserSimpleService],
  controllers: [UserSimpleController]
})
export class UserSimpleModule {}
