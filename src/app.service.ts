import { Injectable } from '@nestjs/common';

// const helloPage = `
//   <p>Matrix & Node find you...</p>
//   <a href="https://docs.nestjs.com/middleware" target="blank">DOCs</a><br>
//   <button><a href="http://localhost:3000/users">Users page</a></button>
// `;

/* 
  BAD isdea render HTML in services !!! 
  should use contoller for it
*/
@Injectable()
export class AppService {
  getHello(): string {
    return 'Plese select SignIn or SignUp';
  }
  isSignIn() {
    return '/signin';
  }
  isSignUp() {
    return '/signup';
  }
}
