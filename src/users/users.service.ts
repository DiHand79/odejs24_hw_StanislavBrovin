import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, IUserID, allUsers } from './users.list';

@Injectable()
export class UsersService {
  addNewUser(createUserDto: CreateUserDto): IUser[] {
    allUsers.push(createUserDto);
    console.log(allUsers);
    return allUsers;
  }

  getAllUsers() {
    return allUsers;
    // return `This action returns all users`;
    // const listUsers = allUsers.map(
    //   (user) => `<p>${JSON.stringify(user)}<p><br>`,
    // );
    // return `
    // <p>This action returns all users</p>
    // <div>${listUsers}</div>
    // <button><a href="http://localhost:3000/">Home page</a></button>
    // `;
  }

  getCurrentUser(user: IUserID): IUser {
    return allUsers[user.id];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
