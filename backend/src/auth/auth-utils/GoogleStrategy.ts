import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

constructor() {
    super({
    clientID: "1002649678135-4n4gd4kmjabua37u7v6jq2jni18e4s03.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
    scope: ['email', 'profile'],
    });
}

async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
    googleId: profile.id,
    email: emails[0].value,
    firstName: name.givenName,
    lastName: name.familyName,
    accessToken
    }
    done(null, user);
}
}