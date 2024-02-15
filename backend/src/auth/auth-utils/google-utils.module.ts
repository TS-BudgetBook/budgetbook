import { Module } from '@nestjs/common';
import { GoogleStrategy } from './GoogleStrategy';

@Module({
    providers: [GoogleStrategy]
})
export class AuthUtilsModule {}