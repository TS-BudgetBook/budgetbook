import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../entity/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateGoogleUser(googleId: string): Promise<any>;
    generateToken(user: any): string;
    googleLogin(req: Request<any, any, User>): Promise<{
        access_token: string;
    }>;
}
