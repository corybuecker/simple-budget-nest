import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from '../logger/logger.module';
import { SessionsModule } from '../sessions/sessions.module';
import { User } from '../users/user.model';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [SequelizeModule.forFeature([User]), SessionsModule, LoggerModule],
})
export class DashboardModule {}
