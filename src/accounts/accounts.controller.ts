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
import { Request } from 'express';
import { Account } from './account.model';
import { InjectModel } from '@nestjs/sequelize';
import { AccountDto } from './account.dto';
import { SessionGuard } from '../auth/session.guard';

const defaultValidationOptions = {
  transform: true,
  forbidNonWhitelisted: true,
  whitelist: true,
};

@Controller('/api/accounts')
@UseGuards(SessionGuard)
export class AccountsController {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.simpleBudgetUser;
    return this.accountModel.findAll({ where: { userId: user.id } });
  }

  @Post()
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async create(@Req() req: Request, @Body() accountDto: AccountDto) {
    const user = req.simpleBudgetUser;
    return await user.$create<Account>('account', accountDto.serialize());
  }

  @Put(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async update(
    @Req() req: Request,
    @Body() accountDto: AccountDto,
    @Param('id') id: string,
  ) {
    const user = req.simpleBudgetUser;
    const account = await this.accountModel.findOne({
      where: { userId: user.id, id: id },
    });

    if (!account) {
      throw 'missing account';
    }

    return await account.update(accountDto.serialize());
  }

  @Get(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async get(@Req() req: Request, @Param('id') id: string) {
    const user = req.simpleBudgetUser;
    const account = await this.accountModel.findOne({
      where: { userId: user.id, id: id },
    });

    if (!account) {
      throw 'missing account';
    }

    return account;
  }
}
