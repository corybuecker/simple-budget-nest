import { IsNumber, IsPositive, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SavingDto {
  @Length(1, 255)
  public name!: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value as unknown))
  public amount!: number;

  public serialize() {
    return {
      name: this.name,
      amount: this.amount,
    };
  }
}
