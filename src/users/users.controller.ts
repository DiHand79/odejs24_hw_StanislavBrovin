import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, IUserID, allUsers } from './users.list';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  listUsers(): IUser[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id') // path param
  getUser(@Param() query: IUserID): IUser {
    return this.usersService.getCurrentUser(query);
  }

  @Post('new')
  addUser(@Body() dto: CreateUserDto): IUser[] {
    return this.usersService.addNewUser(dto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
