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
import { SessionGuard } from '../auth/session.guard';
import { InjectModel } from '@nestjs/sequelize';
import { Goal } from './goal.model';
import { Request } from 'express';
import { GoalDto } from './goal.dto';

const defaultValidationOptions = {
  transform: true,
  forbidNonWhitelisted: true,
  whitelist: true,
};

@Controller('/api/goals')
@UseGuards(SessionGuard)
export class GoalsController {
  constructor(
    @InjectModel(Goal)
    private goalModel: typeof Goal,
  ) {}

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.simpleBudgetUser;
    return this.goalModel.findAll({ where: { userId: user.id } });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async get(@Req() req: Request, @Param('id') id: string) {
    const user = req.simpleBudgetUser;
    const goal = await this.goalModel.findOne({
      where: { userId: user.id, id: id },
    });

    if (!goal) {
      throw 'missing goal';
    }

    return goal;
  }

  @Post()
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async create(@Req() req: Request, @Body() goalDto: GoalDto) {
    const user = req.simpleBudgetUser;
    return await user.$create<Goal>('goal', goalDto.serialize());
  }

  @Put(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async update(
    @Req() req: Request,
    @Body() goalDto: GoalDto,
    @Param('id') id: string,
  ) {
    const user = req.simpleBudgetUser;
    const goal = await this.goalModel.findOne({
      where: { userId: user.id, id: id },
    });

    if (!goal) {
      throw 'missing goal';
    }

    return await goal.update(goalDto.serialize());
  }
}
