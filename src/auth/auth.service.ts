import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { allUsers } from 'src/users/interfaces/users.list';
import SignUpUserDto from './dto/sign-up-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';
import { ITokens } from './interfaces/tokens.interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(body: SignUpUserDto): Promise<ITokens> {
    const { userName, password, firstName, lastName, age, isStudent } = body;

    const user = this.usersService.getUserFromUsername(userName);

    if (user)
      throw new BadRequestException(
        `User with firstName: ${userName} already exists`,
      );

    const hash = await this.hashData(password);
    // const id = await this.hashData(`${userName}_${+Date.now()}`);

    const newUser = {
      userName,
      password: hash,
      firstName,
      lastName,
      age,
      isStudent,
      id: Math.round(Math.random() * 10_000_000) + Date.now(),
    };

    allUsers.push(newUser);

    const tokens = await this.getTokens(newUser.id, userName);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    console.log(
      `Added  new User:>> ${userName} : ${new Date().toString().split('(')[0]}`,
    );

    return tokens;
  }

  async signIn(body: SignInUserDto) {
    const { userName, password } = body;

    const user = this.usersService.getUserFromUsername(userName);
    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch)
      throw new BadRequestException('Password is not correct');

    const tokens = await this.getTokens(user.id, user.userName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    console.log(
      `Login User :>> ${userName} : ${new Date().toString().split('(')[0]}`,
    );

    return tokens;

    // if (user && passwordMatch) {
    //   const { password, ...safeUserData } = user;
    //   console.log(`\n\n\tWELCOME ${safeUserData.userName}`);

    //   return safeUserData;
    // }
    // console.error('ERROR signIn :>>', user.userName);
    // return null;
  }

  async getTokens(userId: number, userName: string): Promise<ITokens> {
    console.log('\nTOKEN GENERATE FOR: ', userId, userName);
    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          userName,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_SECRET_EXPIRE'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          userName,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_SECRET_EXPIRE',
          ),
        },
      ),
    ]);

    console.log(
      `\x1b[33mCREATE TOKENS\x1b[0m
      \x1b[32m accesToken: ${accesToken}  
      refreshToken: ${refreshToken} \x1b[0m
    `,
    );

    return {
      accesToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number, refreshToken: string) {
    console.log(userId, refreshToken);
    const user = this.usersService.getUserFromId(userId);
    console.log('userId: ', userId, user);

    if (!user && !user?.refreshToken)
      throw new ForbiddenException('Access Denied!');

    const tokenMatch = await argon2.verify(user.refreshToken, refreshToken);

    if (!tokenMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(userId, user.userName);
    console.log(`
      REFRESH TOKENS
        \naccesToken: ${tokens.accesToken}  
        \nrefreshToken: ${tokens.refreshToken}  
    `);

    await this.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashToken = await this.hashData(refreshToken);

    this.usersService.updateCurrentUser(userId, {
      refreshToken: hashToken,
    });
  }

  logOut(userId: number) {
    console.log('logout :>> ', userId);
    return this.usersService.updateCurrentUser(userId, { refreshToken: null });
  }

  async hashData(data: string) {
    return argon2.hash(data);
  }
}
