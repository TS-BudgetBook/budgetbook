import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() userData: User): User {
    return this.userService.createUser(userData);
  }
}