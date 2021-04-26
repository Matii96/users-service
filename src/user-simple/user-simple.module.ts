import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSimpleService } from './user-simple.service';
import { UserSimpleController } from './user-simple.controller';
import { UserEntity } from 'src/repository/user.entity';
import { LoginHistoryEntity } from 'src/repository/user-login-history.model';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity, LoginHistoryEntity])],
  providers: [UserSimpleService],
  controllers: [UserSimpleController]
})
export class UserSimpleModule {}
