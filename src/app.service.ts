import { Injectable } from '@nestjs/common';

const helloPage = `
  <p>Matrix & Node find you...</p>
  <a href="https://docs.nestjs.com/middleware" target="blank">DOCs</a><br>
  <button><a href="http://localhost:3000/users">Users page</a></button>
`;

@Injectable()
export class AppService {
  getHello(): string {
    return helloPage;
  }
}
