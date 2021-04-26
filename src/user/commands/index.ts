import { CreateUserHandler } from './create-user/create-user.handler';
import { RemoveUserHandler } from './remove-user/remove-user.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';

export const UserCommandHandlers = [CreateUserHandler, UpdateUserHandler, RemoveUserHandler];
