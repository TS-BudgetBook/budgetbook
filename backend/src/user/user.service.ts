import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity'

@Injectable()
export class UserService {
  async validateGoogleUser(googleUser: any): Promise<User> {
    
    const user: User = {
      id: googleUser.sub,
      email: googleUser.email,
     
    };
   
    return user;
  }
}