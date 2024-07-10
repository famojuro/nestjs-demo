import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserModel } from '../model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: UserModel[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@amelissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Baush',
      email: 'Nathan@ayenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): UserModel[] {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User role not found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findById(id: number): UserModel {
    console.log(
      'user model ===> {}',
      this.users.find((user) => user.id === id),
    );
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(userDto: CreateUserDto): UserModel[] {
    const lastId = Math.max(...this.users.map((user) => user.id));
    const userId = lastId + 1;

    const newUser = {
      id: userId,
      ...userDto,
    };

    this.users.push(newUser);
    return this.users;
  }

  updateUser(id: number, updatedUser: UpdateUserDto): UserModel {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findById(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findById(id);

    this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
