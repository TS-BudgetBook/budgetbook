import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth-utils/GoogleStrategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { MetricsService } from 'src/metrics/metrics.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      global: true,
      secret: '58e75a3e1aeb0820452c346aec8469e0cdc61f80d519e1fc24ae0d1e514c5835',
      signOptions: { expiresIn: '3d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    MetricsService,
    GoogleStrategy,
    JwtService,
    UserService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
