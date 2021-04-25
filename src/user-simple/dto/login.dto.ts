import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class LoginDto extends LoginUserDto {
  @ApiProperty()
  jwt: string;
}
