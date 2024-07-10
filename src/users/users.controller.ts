import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from '../model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): UserModel[] {
    return this.usersService.findAll(role);
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): UserModel {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdate: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, userUpdate);
  }

  @Delete('/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
