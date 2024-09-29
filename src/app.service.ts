import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<p>Matrix & Node find you...</p><a href="https://docs.nestjs.com/middleware" target="blank">DOCs</a>';
  }
}
