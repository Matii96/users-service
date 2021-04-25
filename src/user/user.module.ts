import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule],
  controllers: [UserController]
})
export class UserModule {}
