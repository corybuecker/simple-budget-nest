import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Saving } from './saving.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Saving])],
})
export class SavingsModule {}
