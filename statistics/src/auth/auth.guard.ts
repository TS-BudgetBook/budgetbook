import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private logger: Logger = new Logger(`AUTH_GUARD`)
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Can Activate Method');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.log('Unauthorizied', 'No Token provided');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET.trim()
      });

      this.logger.log('Authorizied', 'Token valid');
      request['customer'] = payload;
    } catch (err) {
      this.logger.log('Unauthorizied', 'Token invalid', err);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
