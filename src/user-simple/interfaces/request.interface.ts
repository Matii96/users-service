import { Request } from 'express';
import { UserSimple } from '../models/user.model';

export interface IRequestUser extends Request {
  user: UserSimple;
}
