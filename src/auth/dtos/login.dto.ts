import { IsString, IsEmail, Length } from 'class-validator';
export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(5, 20)
  readonly password: string;
}
