import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Saving } from './saving.model';
import { SavingsController } from './savings.controller';
import { SavingDto } from './saving.dto';

@Module({
  imports: [SequelizeModule.forFeature([User, Saving])],
  providers: [SavingDto],
  controllers: [SavingsController],
})
export class SavingsModule {}
