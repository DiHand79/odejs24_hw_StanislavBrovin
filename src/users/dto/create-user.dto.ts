import { Transform } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsBoolean,
  Min,
  Max,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 33)
  userName: string;

  @IsString()
  @Length(2, 33)
  firstName: string;

  @IsString()
  @Length(2, 33)
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsBoolean()
  isStudent: boolean;

  // @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  refreshToken?: string;

  @IsString()
  accessToken?: string;
}
