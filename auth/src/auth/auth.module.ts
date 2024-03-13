import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth-utils/GoogleStrategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './contanst';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'google' }),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3d' },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, GoogleStrategy, JwtService, UserService, Logger],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
    constructor(private logger: Logger) {
        logger.log("Google Client Id: " + process.env.GOOGLE_CLIENT_ID.trim());
    }
}
