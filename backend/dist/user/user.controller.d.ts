import { UserService } from './user.service';
import { User } from '../entity/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(userData: User): Promise<User>;
}
