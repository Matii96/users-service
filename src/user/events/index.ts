import { UserLoggedInHandler } from './user-logged-in/user-logged-in.handler';
import { UserRegisteredHandler } from './user-registered/user-registered.handler';
import { UserDataUpdatedHandler } from './user-data-updated/user-data-updated.handler';

export const UserEventHandlers = [UserLoggedInHandler, UserRegisteredHandler, UserDataUpdatedHandler];
