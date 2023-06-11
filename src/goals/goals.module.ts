import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Goal } from './goal.model';
import { GoalsController } from './goals.controller';
import { GoalDto } from './goal.dto';

@Module({
  imports: [SequelizeModule.forFeature([User, Goal])],
  providers: [GoalDto],
  controllers: [GoalsController],
})
export class GoalsModule {}
