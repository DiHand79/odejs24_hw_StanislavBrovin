import {
  IsBoolean,
  IsNumber,
  IsString,
  // IsStrongPassword,
  Length,
  Min,
  Max,
} from 'class-validator';

export default class SignUpUserDto {
  @IsString()
  @Length(2, 33)
  userName: string;

  @IsString()
  // @IsStrongPassword()
  @Length(6, 30)
  password: string;

  @IsString()
  @Length(2, 30)
  firstName?: string;

  @IsString()
  @Length(2, 30)
  lastName?: string;

  @IsNumber()
  @Min(6)
  @Max(100)
  age?: number;

  @IsBoolean()
  isStudent?: boolean;
}
