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
    AccountsModule,
    AuthModule,
    DashboardModule,
    GoalsModule,
    SavingsModule,
    SessionsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST || '',
      username: process.env.DATABASE_USERNAME || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: 'simple_budget',
      autoLoadModels: true,
      synchronize: true,
      logQueryParameters: true,
      sync: { alter: true },
    }),
  ],
})
export class AppModule {}
