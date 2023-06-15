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
import { User } from '../users/user.model';

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

    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Get()
  async findAll(@Req() { userId }: Request): Promise<Saving[]> {
    return this.savingModel.findAll({ where: { userId: userId } });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async get(@Req() { userId }: Request, @Param('id') id: string) {
    return this.savingModel.findOne({
      where: { userId, id },
      rejectOnEmpty: true,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async create(@Req() { userId }: Request, @Body() savingDto: SavingDto) {
    const user = await this.userModel.findOne({
      where: { id: userId },
      rejectOnEmpty: true,
    });

    return user.$create<Saving>('saving', savingDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async update(
    @Req() { userId }: Request,
    @Body() savingDto: SavingDto,
    @Param('id') id: string,
  ) {
    const saving = await this.savingModel.findOne({
      where: { userId, id },
      rejectOnEmpty: true,
    });

    saving.setAttributes(savingDto);
    return saving.save();
  }
}
