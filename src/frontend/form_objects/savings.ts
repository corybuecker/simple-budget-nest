import { IsNumber, IsPositive, Length, validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

export class SavingFormObject {
  @Length(1, 255)
  public declare name: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  public declare amount: number;

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true });
  }
}
