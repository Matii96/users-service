import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export function SequelizeConfigFactory(configService: ConfigService): SequelizeModuleOptions {
  const confg = configService.get<SequelizeModuleOptions>(process.env.NODE_ENV);
  confg.autoLoadModels = true;
  confg.synchronize = process.env.NODE_ENV === 'development';

  if (process.env.NODE_ENV !== 'production') {
    const logger = new Logger('Database');
    confg.logging = (msg: any): void => {
      logger.debug(msg);
    };
  }

  return confg;
}
