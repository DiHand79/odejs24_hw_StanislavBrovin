import { Injectable } from '@nestjs/common';

/* 
  BAD idea render HTML in services !!! 
  should use contoller for it
*/
@Injectable()
export class AppService {
  getHello(): string {
    return 'Plese select SignIn or SignUp';
  }
  // isSignIn() {
  //   return '/signin';
  // }
  // isSignUp() {
  //   return '/signup';
  // }
}
