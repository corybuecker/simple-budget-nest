import { Controller, Get, Redirect, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from 'passport-openidconnect';

@Controller('authentication')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('openidconnect'))
  public redirect() {
    return;
  }
  @Get('callback')
  @UseGuards(AuthGuard('openidconnect'))
  @Redirect('/accounts')
  public callback(@Request() req: Express.Request) {
    req.session.profile = req.user as unknown as Profile;
  }
}
