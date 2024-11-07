import { IsString, Length } from 'class-validator';

export default class SignInUserDto {
  @IsString()
  @Length(2, 33)
  userName: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
