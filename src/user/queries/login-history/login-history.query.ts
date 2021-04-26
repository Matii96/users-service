import { IQuery } from '@nestjs/cqrs';

export class GetLoginHistoryQuery implements IQuery {
  public constructor(public id: number) {}
}
