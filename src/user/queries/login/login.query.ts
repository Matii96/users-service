import { IQuery } from '@nestjs/cqrs';
import { Request } from 'express';
import { LoginInputDto } from 'src/user/dto/login-input.dto';

export class LoginQuery implements IQuery {
  public constructor(public req: Request, public data: LoginInputDto) {}
}
