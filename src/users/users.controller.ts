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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserFullDto } from './dto/update-user.dto';
import { IUser } from './users.list';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  listUsers(): IUser[] {
    return this.usersService.getAllUsers();
  }

  // query param > localhost:3000/users?id=3
  // @Get(':id')
  // getUser(@Query() query: IUserID): IUser {
  //   return this.usersService.getCurrentUser(query);
  // }

  // path param  > localhost:3000/users/3
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.getCurrentUser(id);
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
