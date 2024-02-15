import { AuthService } from '../auth.service';
export declare class GoogleController {
    private authService;
    constructor(authService: AuthService);
    googleLogin(): Promise<void>;
    googleLoginCallback(req: any): Promise<void>;
}
