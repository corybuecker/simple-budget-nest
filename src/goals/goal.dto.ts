import { IsDate, IsEnum, IsNumber, IsPositive, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { Injectable } from '@nestjs/common';

export enum GoalRecurrence {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

@Injectable()
export class GoalDto {
  @Length(1, 255)
  public declare name: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  public declare amount: number;

  @IsEnum(GoalRecurrence)
  public declare recurrence: GoalRecurrence;

  @IsDate()
  @Transform(({ value }) => new Date(value as string))
  public declare targetDate: Date;

  public serialize() {
    return {
      name: this.name,
      amount: this.amount,
      recurrence: this.recurrence,
      targetDate: this.targetDate,
    };
  }
}
