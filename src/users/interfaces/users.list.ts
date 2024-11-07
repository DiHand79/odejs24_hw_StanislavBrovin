interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  isStudent: boolean;
  id: number;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

interface IUserID {
  id: number;
}

const allUsers: IUser[] = [
  {
    userName: 'AlexWoo',
    firstName: 'Alex',
    lastName: 'Woo',
    age: 34,
    isStudent: true,
    id: 1234567890,
    password: process.env.DEFAULT_PASSWORD,
    accessToken: '',
    refreshToken: '',
  },
  {
    userName: 'AlexBolduin',
    firstName: 'Alex',
    lastName: 'Bolduin',
    age: 23,
    isStudent: false,
    id: 1234567891,
    password: process.env.DEFAULT_PASSWORD,
    accessToken: '',
    refreshToken: '',
  },
  {
    userName: 'AlexSich',
    firstName: 'Alex',
    lastName: 'Sich',
    age: 41,
    isStudent: false,
    id: 1234567892,
    password: process.env.DEFAULT_PASSWORD,
    accessToken: '',
    refreshToken: '',
  },
];

/* 
 {
    "firstName": "Along",
    "lastName": "Mo",
    "age": "111",
    "isStudent": "false",
    "id": 1234567893
}
{
    "firstName": "Agoo",
    "lastName": "MTF",
    "age": "33",
    "isStudent": "false",
    "id": 1234567894
}
*/

export { IUser, IUserID, allUsers };
