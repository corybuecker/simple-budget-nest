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
import { AccountDto } from './account.dto';
import { Account } from './account.model';

const defaultValidationOptions = {
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
};

@Controller('/api/accounts')
@UseGuards(SessionGuard)
export class AccountsController {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,

    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Get()
  async findAll(@Req() { userId }: Request): Promise<Account[]> {
    return this.accountModel.findAll({ where: { userId } });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async get(@Req() { userId }: Request, @Param('id') id: string) {
    return await this.accountModel.findOne({
      where: { userId, id: id },
      rejectOnEmpty: true,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async create(@Req() { userId }: Request, @Body() accountDto: AccountDto) {
    const user = await this.userModel.findOne({
      where: { id: userId },
      rejectOnEmpty: true,
    });

    return await user.$create<Account>('account', accountDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe(defaultValidationOptions))
  async update(
    @Req() { userId }: Request,
    @Body() accountDto: AccountDto,
    @Param('id') id: string,
  ) {
    const account = await this.accountModel.findOne({
      where: { userId, id: id },
      rejectOnEmpty: true,
    });

    account.setAttributes(accountDto);
    return await account.save();
  }
}
