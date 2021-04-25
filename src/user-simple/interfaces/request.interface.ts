import { Request } from 'express';
import { User } from '../models/user.model';

export interface IRequestUser extends Request {
  user: User;
}
