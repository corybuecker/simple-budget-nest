import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GoalsModule } from './goals/goals.module';
import { SavingsModule } from './savings/savings.module';
import { SessionsModule } from './sessions/sessions.module';
import { RootModule } from './root/root.module';

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
      sync: { alter: true },
    }),
    RootModule,
  ],
})
export class AppModule {}
