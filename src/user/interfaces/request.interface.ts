import { Request } from 'express';
import { UserEntity } from 'src/repository/user.entity';

export interface IRequestUser extends Request {
  user: UserEntity;
}
