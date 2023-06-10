import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SavingsModule } from './savings/savings.module';
import { GoalsModule } from './goals/goals.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      autoLoadModels: true,
      synchronize: true,
      logQueryParameters: true,
    }),
    AccountsModule,
    SavingsModule,
    GoalsModule,
    DashboardModule,
    AuthModule,
    SessionsModule,
  ],
})
export class AppModule {}
