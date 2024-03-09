import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private configService;
    private logger;
    constructor(jwtService: JwtService, configService: ConfigService, logger: Logger);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
