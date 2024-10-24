import { Body, Controller, Get, Post, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import SignUpUserDto from './dto/sign-up-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';

// https://handlebarsjs.com/

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /* 
    в уроке на 1:39

    иам оба sighUp signIn + useGuards
  
    */
  @Get()
  isAuth(@Res() res: Response) {
    return res.render('authWelcome', { message: 'Plese select:' });
  }

  @Get('/signup')
  @Render('signUpWelcome')
  _isSignUp() {}

  @Get('/signin')
  @Render('signInWelcome')
  _isSignIn() {}

  @Post('/auth/signup')
  async isSignUp(@Res() res: Response, @Body() dto: SignUpUserDto) {
    const authRes = await this.authService.signUp(dto);
    console.log('authRes: ', authRes);

    return res.render('authWelcome', {
      message: `Plese signup ${authRes}`,
    });
  }

  @Post('/auth/signin')
  async isSignIn(@Res() res: Response, @Body() dto: SignInUserDto) {
    const authRes = await this.authService.signUp(dto);
    console.log('authRes: ', authRes);

    return res.render('authWelcome', {
      message: `Plese signin ${authRes}`,
    });
  }
}
