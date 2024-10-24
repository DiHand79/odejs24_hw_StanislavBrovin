import { Injectable } from '@nestjs/common';
import SignUpUserDto from './dto/sign-up-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';

@Injectable()
export class AuthService {
  signUp(dto: SignUpUserDto) {
    console.log('signUp :>>', dto.username, dto.password);
    return dto;
  }

  signIn(dto: SignInUserDto) {
    console.log('signIn :>> ', dto.username, dto.password);
    return dto;
  }
}
