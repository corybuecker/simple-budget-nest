import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { User } from '../users/user.model';
import { RootController } from './root.controller';
import { RootFilter } from './root.filter';
import { RootService } from './root.service';

@Module({
  controllers: [RootController],
  providers: [RootService, RootFilter],
  imports: [LoggerModule, AuthModule, SequelizeModule.forFeature([User])],
})
export class RootModule {}
