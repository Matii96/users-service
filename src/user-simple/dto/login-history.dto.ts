import { ApiProperty } from '@nestjs/swagger';

export class UserLoginHistoryDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  browser: string;
}
