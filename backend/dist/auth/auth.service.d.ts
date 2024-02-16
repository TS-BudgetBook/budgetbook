import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../entity/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateGoogleUser(googleId: string): Promise<User>;
    createProfileIfNew(googleId: string, email: string): Promise<User>;
    generateToken(user: User): string;
    googleLogin(req: Request): Promise<{
        access_token: string;
    }>;
}
