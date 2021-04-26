import { Request } from 'express';
import { UserEntity } from 'src/repository/user.entity';

export interface IRequestUserSimple extends Request {
  user: UserEntity;
}
