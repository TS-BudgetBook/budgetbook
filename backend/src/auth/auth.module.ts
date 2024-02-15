import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './contanst';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy'; 

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    

  ],
  providers: [AuthService, GoogleStrategy], 
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
