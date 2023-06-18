import { LoggerService } from '@nestjs/common/services/logger.service';
import Decimal from 'decimal.js';
import { differenceInDays, sub } from 'date-fns';
import { Goal } from '../../goals/goal.model';
import { GoalRecurrence } from '../../goals/types';

export class Amortized {
  constructor(
    private readonly goal: Goal,
    private readonly logger: LoggerService,
  ) {}

  public amountToDate() {
    this.logger.log(this.goal.name);
    this.logger.log(this.savedTodate());
    return new Decimal(this.savedTodate());
  }

  private startDate() {
    switch (this.goal.recurrence) {
      case GoalRecurrence.NEVER:
        return this.goal.creationDate;
      case GoalRecurrence.DAILY:
        return sub(this.goal.targetDate, { days: 1 });
      case GoalRecurrence.WEEKLY:
        return sub(this.goal.targetDate, { weeks: 1 });
      case GoalRecurrence.MONTHLY:
        return sub(this.goal.targetDate, { months: 1 });
      case GoalRecurrence.QUARTERLY:
        return sub(this.goal.targetDate, { months: 3 });
      case GoalRecurrence.YEARLY:
        return sub(this.goal.targetDate, { years: 1 });
      default:
        throw Error('unknown recurrence');
    }
  }

  private duration(): Interval {
    const start = this.startDate();
    const end = this.goal.targetDate;
    return { start, end };
  }

  private daysToSave() {
    if (differenceInDays(this.duration().end, this.duration().start) === 0) {
      return new Decimal(1);
    }

    return new Decimal(
      differenceInDays(this.duration().end, this.duration().start),
    );
  }

  private dailyAmountToSave() {
    return Decimal.div(this.goal.amount, this.daysToSave());
  }

  private savedTodate() {
    return Decimal.mul(this.dailyAmountToSave(), this.elapsedDays());
  }

  private elapsedDays() {
    if (differenceInDays(new Date(), this.duration().start) < 0) {
      return new Decimal(0);
    }

    return differenceInDays(new Date(), this.duration().start);
  }
}
