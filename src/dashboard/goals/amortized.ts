import { LoggerService } from '@nestjs/common/services/logger.service';
import { differenceInDays, sub } from 'date-fns';
import Decimal from 'decimal.js';
import { Recurrence } from '../../types';

type Amortizable = {
  targetDate: Date;
  amount: Decimal;
  recurrence: Recurrence;
  creationDate: Date;
};

export class Amortized {
  constructor(
    private readonly amortizable: Amortizable,
    private readonly logger: LoggerService,
  ) {}

  public amountToDate() {
    this.logger.log(this.savedToDate());
    return new Decimal(this.savedToDate());
  }

  private startDate() {
    switch (this.amortizable.recurrence) {
      case Recurrence.NEVER:
        return this.amortizable.creationDate;
      case Recurrence.DAILY:
        return sub(this.amortizable.targetDate, { days: 1 });
      case Recurrence.WEEKLY:
        return sub(this.amortizable.targetDate, { weeks: 1 });
      case Recurrence.MONTHLY:
        return sub(this.amortizable.targetDate, { months: 1 });
      case Recurrence.QUARTERLY:
        return sub(this.amortizable.targetDate, { months: 3 });
      case Recurrence.YEARLY:
        return sub(this.amortizable.targetDate, { years: 1 });
      default:
        throw Error('unknown recurrence');
    }
  }

  private duration(): Interval {
    const start = this.startDate();
    const end = this.amortizable.targetDate;
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
    return Decimal.div(this.amortizable.amount, this.daysToSave());
  }

  private savedToDate() {
    return Decimal.mul(this.dailyAmountToSave(), this.elapsedDays());
  }

  private elapsedDays() {
    if (differenceInDays(new Date(), this.duration().start) < 0) {
      return new Decimal(0);
    }

    return differenceInDays(new Date(), this.duration().start);
  }
}
