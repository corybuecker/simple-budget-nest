import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  validate,
} from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { Transform } from 'class-transformer';

export interface FormAccount {
  name: string;
  amount: string;
  debt: boolean;
}

export class FormAccountValidator {
  @Length(1, 255)
  public name!: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value as unknown))
  public amount!: number;

  @IsOptional()
  @IsBoolean()
  public debt!: boolean;

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true });
  }
}
