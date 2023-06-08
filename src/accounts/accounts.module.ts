import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Account } from './account.model';
import { AccountDto } from './account.dto';

@Module({
  controllers: [AccountsController],
  providers: [AccountDto],
  imports: [SequelizeModule.forFeature([User, Account])],
})
export class AccountsModule {}
