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
import { Request } from 'express';
import { Saving } from './saving.model';
import { SavingDto } from './saving.dto';

const defaultValidationOptions = {
  transform: true,
  forbidNonWhitelisted: true,
  whitelist: true,
};

@Controller('/api/savings')
@UseGuards(SessionGuard)
export class SavingsController {
  constructor(
    @InjectModel(Saving)
    private savingModel: typeof Saving,
  ) {}

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.simpleBudgetUser;
    return this.savingModel.findAll({ where: { userId: user.id } });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async get(@Req() req: Request, @Param('id') id: string) {
    const user = req.simpleBudgetUser;
    const saving = await this.savingModel.findOne({
      where: { userId: user.id, id: id },
    });

    if (!saving) {
      throw 'missing saving';
    }

    return saving;
  }

  @Post()
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async create(@Req() req: Request, @Body() savingDto: SavingDto) {
    const user = req.simpleBudgetUser;
    return await user.$create<Saving>('saving', savingDto.serialize());
  }

  @Put(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async update(
    @Req() req: Request,
    @Body() savingDto: SavingDto,
    @Param('id') id: string,
  ) {
    const user = req.simpleBudgetUser;
    const saving = await this.savingModel.findOne({
      where: { userId: user.id, id: id },
    });

    if (!saving) {
      throw 'missing saving';
    }

    return await saving.update(savingDto.serialize());
  }
}
