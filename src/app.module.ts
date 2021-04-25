import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeConfigFactory } from './database/sequelize-config.factory';
import { UserSimpleModule } from './user-simple/user-simple.module';
import { UserModule } from './user/user.module';
import config from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: SequelizeConfigFactory
    }),
    UserSimpleModule,
    UserModule
  ]
})
export class AppModule {}
