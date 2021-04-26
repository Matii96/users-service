import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEmail, IsDefined, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ModifyUserDto {
  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  password: string;

  @ApiProperty({ required: false, maxLength: 256 })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  description: string;

  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({ required: false, default: 'en', example: 'en' })
  @IsString()
  @IsOptional()
  lang: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  emailNotification: boolean;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
