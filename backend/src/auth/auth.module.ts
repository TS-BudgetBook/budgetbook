import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './contanst';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth-utils/GoogleStrategy'; 
import { CustomerService } from 'src/customer/customer.service';
import { CustomerModule } from 'src/customer/customer.model';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    CustomerModule

  ],
  providers: [AuthService, GoogleStrategy], 
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
