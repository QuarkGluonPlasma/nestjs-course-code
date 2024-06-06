import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '你的 clientID',
      clientSecret: '你的 clientSecret',
      callbackURL: 'http://localhost:3000/callback/google',
      scope: ['email', 'profile'],
    });
  }

  validate (accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    return user;
  }
}