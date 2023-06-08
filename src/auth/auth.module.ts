import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OpenIdConnectStrategy } from './open-id-connect-strategy.service';
import { SessionGuard } from './session.guard';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';

@Module({
  providers: [AuthService, SessionGuard, OpenIdConnectStrategy],
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([User])],
})
export class AuthModule {}
