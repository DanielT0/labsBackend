import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  identification: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
