import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleLogin(): void;
}
