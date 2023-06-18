import { Injectable } from '@nestjs/common';
import {
  default as PassportOidcStrategy,
  Profile,
  StrategyOptions,
} from 'passport-openidconnect';
import { PassportStrategy } from '@nestjs/passport';

const strategyOptions: StrategyOptions = {
  issuer: 'https://accounts.google.com',
  authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenURL: 'https://oauth2.googleapis.com/token',
  callbackURL: 'https://localhost:3000/authentication/callback',
  userInfoURL: 'https://openidconnect.googleapis.com/v1/userinfo',
  clientID: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  scope: ['openid email'],
};

@Injectable()
export class OpenIdConnectStrategy extends PassportStrategy(
  PassportOidcStrategy,
) {
  constructor() {
    super(strategyOptions);
  }

  validate(issuer: string, profile: Profile) {
    return profile;
  }
}
