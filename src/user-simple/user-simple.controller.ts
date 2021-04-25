import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserSimpleService } from './user-simple.service';
import { GetUserDto } from './dto/get.dto';
import { ModifyUserDto } from './dto/modify.dto';
import { UserLoginHistoryDto } from './dto/login-history.dto';
import { AccessUser } from './guards/access.guard';
import { IRequestUser } from './interfaces/request.interface';
import { LoginInputDto } from './dto/login-input.dto';

@ApiTags('User simple')
@UseGuards(AccessUser)
@Controller('user-simple')
export class UserSimpleController {
  public constructor(private userSimpleService: UserSimpleService) {}

  @Get()
  @ApiOkResponse({ type: [GetUserDto] })
  public List() {
    return this.userSimpleService.List();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: GetUserDto })
  public GetUser(@Req() req: IRequestUser) {
    return this.userSimpleService.GetUser(req.user);
  }

  @Get(':id/login-history')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: [UserLoginHistoryDto] })
  public GetLoginHistory(@Req() req: IRequestUser) {
    return this.userSimpleService.GetLoginHistory(req.user.id);
  }

  @Post('login')
  @ApiBody({ type: LoginInputDto })
  @ApiCreatedResponse({ type: GetUserDto })
  public Login(@Req() req: Request, @Body() data: LoginInputDto) {
    return this.userSimpleService.Login(req, data);
  }

  @Post()
  @ApiBody({ type: ModifyUserDto })
  @ApiCreatedResponse({ type: GetUserDto })
  public CreateUser(@Body() data: ModifyUserDto) {
    return this.userSimpleService.CreateUser(data);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ModifyUserDto })
  @ApiOkResponse({ type: GetUserDto })
  public UpdateUser(@Req() req: IRequestUser, @Body() data: ModifyUserDto) {
    return this.userSimpleService.UpdateUser(req.user.id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'id or hash' })
  @ApiOkResponse({ type: Number, description: 'Removed user id' })
  public RemoveUser(@Req() req: IRequestUser) {
    return this.userSimpleService.RemoveUser(req.user.id);
  }
}
