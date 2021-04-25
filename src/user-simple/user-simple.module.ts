import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSimpleService } from './user-simple.service';
import { UserSimpleController } from './user-simple.controller';
import { LoginHistory } from './models/user-login-history.model';
import { User } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User, LoginHistory])],
  providers: [UserSimpleService],
  controllers: [UserSimpleController]
})
export class UserSimpleModule {}
