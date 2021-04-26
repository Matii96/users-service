import { ICommand } from '@nestjs/cqrs';
import { ModifyUserDto } from 'src/user-simple/dto/modify.dto';

export class UpdateUserCommand implements ICommand {
  public constructor(public id: number, public data: ModifyUserDto) {}
}
