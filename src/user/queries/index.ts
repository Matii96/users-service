import { GetUserHandler } from './get-user/get-user.handler';
import { ListUsersHandler } from './list-users/list-users.handler';
import { GetLoginHistoryHandler } from './login-history/login-history.handler';
import { LoginHandler } from './login/login.handler';

export const UserQueryHandlers = [GetUserHandler, ListUsersHandler, LoginHandler, GetLoginHistoryHandler];
