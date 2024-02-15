import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userData: User): Promise<User>;
    findByGoogleId(googleId: string): Promise<User | null>;
}
