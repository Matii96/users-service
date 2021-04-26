import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserDataUpdatedEvent } from '../events/user-data-updated/user-data-updated.event';
import { UserRegisteredEvent } from '../events/user-registered/user-registered.event';

@Injectable()
export class UserSagas {
  // @Saga()
  // public userLoggedIn = (events$: Observable<any>) => {
  //   return events$.pipe(
  //     ofType(UserLoggedInEvent),
  //     map(event => new AddLoginHistoryCommand(event.user, event.req))
  //   );
  // };

  @Saga()
  public userdataChanged = (events$: Observable<any>) => {
    return events$.pipe(
      ofType(UserRegisteredEvent, UserDataUpdatedEvent),
      delay(1000),
      map(event => new AddLoginHistoryCommand(event.user, event.req))
    );
  };
}
