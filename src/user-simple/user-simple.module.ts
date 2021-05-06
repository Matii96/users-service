import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSimpleService } from './user-simple.service';
import { UserSimpleController } from './user-simple.controller';
import { UserEntities } from 'src/entities';

@Module({
  imports: [SequelizeModule.forFeature(UserEntities)],
  providers: [UserSimpleService],
  controllers: [UserSimpleController]
})
export class UserSimpleModule {}
