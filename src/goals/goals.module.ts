import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { GoalDto } from './goal.dto';
import { Goal } from './goal.model';
import { GoalsController } from './goals.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Goal])],
  providers: [GoalDto],
  controllers: [GoalsController],
})
export class GoalsModule {}
