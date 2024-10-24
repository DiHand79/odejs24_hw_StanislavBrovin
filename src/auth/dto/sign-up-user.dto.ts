import { IsString, IsStrongPassword, Length } from 'class-validator';

export default class SignUpUserDto {
  @IsString()
  @Length(2, 33)
  username: string;

  @IsString()
  @IsStrongPassword()
  @Length(6, 30)
  password: string;
}
