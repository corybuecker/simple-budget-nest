import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Goal } from './goal.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Goal])],
})
export class GoalsModule {}
