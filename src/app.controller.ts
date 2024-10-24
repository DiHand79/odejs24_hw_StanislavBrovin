import { AppService } from './app.service';
import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('welcome')
  // root() {
  //   return { message: 'Hello >>>' };
  // }
  root(@Res() res: Response): void {
    const message = this.appService.getHello();
    return res.render(`welcome`, {
      message: message,
      // isSignIn: this.appService.isSignIn,
      // isSignUp: this.appService.isSignUp,
    });
  }
}
