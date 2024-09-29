import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  getIP(): string {
    return 'May be';
  }
}
