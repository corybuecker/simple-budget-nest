import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionsModule } from '../sessions/sessions.module';
import { User } from '../users/user.model';
import { AccountDto } from './account.dto';
import { Account } from './account.model';
import { AccountsController } from './accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [AccountDto],
  imports: [SessionsModule, SequelizeModule.forFeature([User, Account])],
})
export class AccountsModule {}
