interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  isStudent: boolean;
  id: number;
}

interface IUserID {
  id: number;
}

const allUsers: IUser[] = [
  {
    firstName: 'Alex',
    lastName: 'Woo',
    age: 34,
    isStudent: true,
    id: 1234567890,
  },
  {
    firstName: 'Alex',
    lastName: 'Bolduin',
    age: 23,
    isStudent: false,
    id: 1234567891,
  },
  {
    firstName: 'Stan',
    lastName: 'Bro',
    age: 45,
    isStudent: true,
    id: 1234567892,
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

export { IUser, allUsers, IUserID };
