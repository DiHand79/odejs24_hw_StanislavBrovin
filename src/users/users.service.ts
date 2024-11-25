import { Injectable } from '@nestjs/common'; //  ConsoleLogger,
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, allUsers } from './interfaces/users.list';

@Injectable()
export class UsersService {
  /* TMP ALL USERS DATA */
  // private readonly allUsers: IUser[] = [
  //   {
  //     userName: 'AlexWoo',
  //     firstName: 'Alex',
  //     lastName: 'Woo',
  //     age: 34,
  //     isStudent: true,
  //     id: 1234567890,
  //     password: process.env.DEFAULT_PASSWORD,
  //   },
  //   {
  //     userName: 'AlexBolduin',
  //     firstName: 'Alex',
  //     lastName: 'Bolduin',
  //     age: 23,
  //     isStudent: false,
  //     id: 1234567891,
  //     password: process.env.DEFAULT_PASSWORD,
  //   },
  //   {
  //     userName: 'StanBro',
  //     firstName: 'Stan',
  //     lastName: 'Bro',
  //     age: 45,
  //     isStudent: true,
  //     id: 1234567892,
  //     password: process.env.DEFAULT_PASSWORD,
  //   },
  // ];

  addNewUser(createUserDto: CreateUserDto): IUser[] {
    const isDuplicate = allUsers.some(
      (user) =>
        user.firstName === createUserDto.firstName &&
        user.lastName === createUserDto.lastName &&
        user.id === createUserDto.id,
    );

    if (isDuplicate) {
      console.log('Sorry but this data is used');
    } else {
      allUsers.push(createUserDto);
    }
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

  getUserFromId(id: number): IUser {
    return allUsers[id];
  }

  getUserFromUsername(userName: string): IUser | null {
    const user = allUsers.filter((user) => user.userName === userName);
    return user[0] || null;
  }

  updateCurrentUser(id: number, updateUserDto: UpdateUserDto): IUser[] {
    const userIndex = allUsers.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    allUsers[userIndex] = {
      ...allUsers[userIndex],
      ...updateUserDto,
    };

    return allUsers;
  }

  updateCurrentUserFull(id: number, userData: IUser): IUser[] {
    const userIndex = allUsers.findIndex((user, i) => i === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    allUsers[userIndex] = userData;

    return allUsers;
  }

  removeCurrentUser(idForDelete: number): IUser[] {
    const userIndex = allUsers.findIndex((user, i) => i === idForDelete);

    if (userIndex === -1) {
      throw new Error(`User with ID ${idForDelete} not found`);
    }

    allUsers.splice(userIndex, 1);

    return allUsers;
    // const updatedList = allUsers.filter((user, i) => {
    //   return i !== idForDelete;
    // });
    // return updatedList;
  }
}
