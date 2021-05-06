import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export interface IRequestUserSimple extends Request {
  user: User;
}
