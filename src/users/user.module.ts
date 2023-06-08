import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from '../accounts/account.model';
import { User } from './user.model';
import { Goal } from '../goals/goal.model';
import { Saving } from '../savings/saving.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Account, Goal, Saving])],
})
export class UserModule {}
