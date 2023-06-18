import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Decimal from 'decimal.js';
import { AppLogger } from '../logger/logger.service';
import { User } from '../users/user.model';
import { Amortized } from './goals/amortized';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly logger: AppLogger,
  ) {}

  public async currentlyAvailable(userId: string) {
    const user = await this.userModel.findOne({
      where: { id: userId },
      include: ['accounts', 'goals', 'savings'],
      rejectOnEmpty: true,
    });

    const accounts = user.accounts.reduce((acc, account) => {
      return account.debt
        ? Decimal.sub(acc, account.amount)
        : Decimal.add(acc, account.amount);
    }, new Decimal(0));

    const savings = user.savings.reduce((acc, saving) => {
      return Decimal.sub(acc, saving.amount);
    }, new Decimal(0));

    const amortizedGoals = user.goals.map((g) => new Amortized(g, this.logger));

    const goals = amortizedGoals.reduce((acc, amortizedGoal) => {
      return Decimal.sub(acc, amortizedGoal.amountToDate());
    }, new Decimal(0));

    return Decimal.sum(accounts, savings, goals);
  }
}
