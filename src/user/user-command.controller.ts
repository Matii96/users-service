import { Body, Controller, Delete, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get.dto';
import { ModifyUserDto } from './dto/modify.dto';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { RemoveUserCommand } from './commands/remove-user/remove-user.command';
import { UpdateUserCommand } from './commands/update-user/update-user.command';
import { IRequestUser } from './interfaces/request.interface';
import { AccessUser } from './guards/access.guard';

@ApiTags('Users')
@UseGuards(AccessUser)
@Controller('users')
export class UserCommandController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiBody({ type: ModifyUserDto })
  @ApiCreatedResponse({ type: GetUserDto })
  public CreateUser(@Body() data: ModifyUserDto): Promise<GetUserDto> {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ModifyUserDto })
  @ApiOkResponse({ type: GetUserDto })
  public UpdateUser(@Req() req: IRequestUser, @Body() data: ModifyUserDto): Promise<GetUserDto> {
    return this.commandBus.execute(new UpdateUserCommand(req.user.data.id, data));
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  public RemoveUser(@Req() req: IRequestUser) {
    return this.commandBus.execute(new RemoveUserCommand(req.user.data.id));
  }
}
