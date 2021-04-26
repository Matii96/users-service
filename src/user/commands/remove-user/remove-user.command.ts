import { ICommand } from '@nestjs/cqrs';

export class RemoveUserCommand implements ICommand {
  public constructor(public id: number) {}
}
