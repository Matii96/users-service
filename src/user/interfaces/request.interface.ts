import { Request } from 'express';
import { UserAggregate } from '../models/user.model';

export interface IRequestUser extends Request {
  user: UserAggregate;
}
