import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export function SequelizeConfigFactory(configService: ConfigService): SequelizeModuleOptions {
  const connectionConfig = configService.get<SequelizeModuleOptions>(process.env.NODE_ENV);
  connectionConfig.autoLoadModels = true;
  connectionConfig.synchronize = process.env.NODE_ENV === 'development';

  if (process.env.NODE_ENV !== 'production') {
    const logger = new Logger('Database');
    connectionConfig.logging = (msg: any): void => {
      logger.debug(msg);
    };
  }

  return connectionConfig;
}
