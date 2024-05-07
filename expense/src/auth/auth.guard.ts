import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService, private logger: Logger) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, path: url } = request;
    const token = this.extractTokenFromHeader(request);
    this.logger.log(ip, method, url, 'Request');
    if (!token) {
      this.logger.log('Unauthorizied', 'No Token provided');
      throw new UnauthorizedException();
    }
    try {
      this.logger.log('Verify Token with Secret: ' + process.env.JWT_SECRET.trim(), 'EXPENSE-AUTH-GUARD');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET.trim(),
      });

      request['customer'] = payload;
    } catch (err) {
      this.logger.log('Token Validation Error' + err, 'EXPENSE-AUTH-GUARD');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
