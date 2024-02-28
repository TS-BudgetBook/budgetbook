import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from 'src/customer/customer.service';
import { GoogleStrategy } from './auth-utils/GoogleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './contanst';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    CustomerModule,
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
