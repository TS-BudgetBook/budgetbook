import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    return await this.userService.createUser(userData);
  }
}