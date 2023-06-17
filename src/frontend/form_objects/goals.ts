import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsPositive,
  Length,
  validate,
} from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

export enum GoalRecurrence {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export class GoalFormObject {
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

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true });
  }
}
