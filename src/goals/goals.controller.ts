import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { SessionGuard } from '../auth/session.guard';
import { User } from '../users/user.model';
import { GoalDto } from './goal.dto';
import { Goal } from './goal.model';

const defaultValidationOptions = {
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
};

@Controller('/api/goals')
@UseGuards(SessionGuard)
export class GoalsController {
  constructor(
    @InjectModel(Goal)
    private goalModel: typeof Goal,

    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Get()
  async findAll(@Req() { userId }: Request): Promise<Goal[]> {
    return this.goalModel.findAll({ where: { userId } });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async get(@Req() { userId }: Request, @Param('id') id: string) {
    return this.goalModel.findOne({
      where: { userId, id },
      rejectOnEmpty: true,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async create(@Req() { userId }: Request, @Body() goalDto: GoalDto) {
    const user = await this.userModel.findOne({
      where: { id: userId },
      rejectOnEmpty: true,
    });

    return await user.$create<Goal>('goal', goalDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async update(
    @Req() { userId }: Request,
    @Body() goalDto: GoalDto,
    @Param('id') id: string,
  ) {
    const goal = await this.goalModel.findOne({
      where: { userId, id },
      rejectOnEmpty: true,
    });

    goal.setAttributes(goalDto);
    return goal.save();
  }
}
