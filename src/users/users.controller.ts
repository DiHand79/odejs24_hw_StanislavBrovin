import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Put,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserFullDto } from './dto/update-user.dto';
import { IUser } from './interfaces/users.list';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('users')
  root() {
    console.log('users page');
  }

  @Get('list')
  listUsers(): IUser[] {
    console.log('List all users');
    return this.usersService.getAllUsers();
  }

  // query param > localhost:3000/users?id=3
  // @Get(':id')
  // getUser(@Query() query: IUserID): IUser {
  //   return this.usersService.getUserFromId(query);
  // }

  // path param  > localhost:3000/users/3
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.getUserFromId(id);
  }

  @Get('new')
  isLogin(@Res() res: Response) {
    console.log('LOGIN page: ');
    return res.render('loginWelcome', { message: 'Plese select:' });
  }

  @Post('new')
  addUser(@Body() dto: CreateUserDto): IUser[] {
    return this.usersService.addNewUser(dto);
  }

  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number): IUser[] {
    return this.usersService.removeCurrentUser(id);
  }

  @Patch(':id')
  updateCurrentUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<UpdateUserDto>,
  ): IUser[] {
    return this.usersService.updateCurrentUser(id, dto);
  }

  @Put(':id')
  updateCurrentUserFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserFullDto,
  ): IUser[] {
    return this.usersService.updateCurrentUserFull(id, userData);
  }
}
