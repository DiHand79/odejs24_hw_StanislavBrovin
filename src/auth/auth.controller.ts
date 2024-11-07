import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import SignUpUserDto from './dto/sign-up-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';
import AuthTokenGuard from 'src/guards/access-token.guard';
import RefreshTokenGuard from 'src/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  isAuth(@Res() res: Response) {
    console.log('AUTH page: ');
    return res.render('loginWelcome', { message: 'Plese select:' });
  }

  @Post('signup')
  async isSignUp(@Body() dto: SignUpUserDto) {
    console.log('POST signup: ');
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async isSignIn(@Body() dto: SignInUserDto) {
    console.log('POST signin: ');
    return this.authService.signIn(dto);
  }

  @UseGuards(AuthTokenGuard)
  @Post('logout')
  async isLogout(@Req() req: Request) {
    console.log('logout', req, req.user['sub']);
    this.authService.logOut(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('test')
  async isTest(@Res() res: Response) {
    console.log('Test Autorized user page');
    return res.render('testAutorizedPage', { message: 'You great man!' });
  }

  /* 
    TODO  https://youtu.be/Fk33eoWYqnw?t=6791
  */
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    console.log('refresh >>>:\n', req.user['sub']);
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(userId, refreshToken);
  }
}
