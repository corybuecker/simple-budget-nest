import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './session.model';

@Module({
  imports: [SequelizeModule.forFeature([Session])],
})
export class SessionsModule {}
