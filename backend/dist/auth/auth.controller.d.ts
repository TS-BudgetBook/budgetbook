import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleLogin(): void;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    getProfile(req: any): any;
}
