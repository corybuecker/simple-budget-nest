import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsPositive, Length } from 'class-validator';
import { Recurrence } from '../types';

@Injectable()
export class GoalDto {
  @Length(1, 255)
  public declare name: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  public declare amount: number;

  @IsEnum(Recurrence)
  public declare recurrence: Recurrence;

  @IsDate()
  @Transform(({ value }) => new Date(value as string))
  public declare targetDate: Date;
}
