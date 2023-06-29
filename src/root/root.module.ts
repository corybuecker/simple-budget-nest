import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { User } from '../users/user.model';
import { RootController } from './root.controller';
import { RootFilter } from './root.filter';

@Module({
  controllers: [RootController],
  providers: [RootFilter],
  imports: [LoggerModule, AuthModule, SequelizeModule.forFeature([User])],
})
export class RootModule {}
