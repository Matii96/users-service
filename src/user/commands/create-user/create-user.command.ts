import { ICommand } from '@nestjs/cqrs';
import { ModifyUserDto } from 'src/user/dto/modify.dto';

export class CreateUserCommand implements ICommand {
  public constructor(public data: ModifyUserDto) {}
}
