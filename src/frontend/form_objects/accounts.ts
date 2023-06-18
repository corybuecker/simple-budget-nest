import {
  IsBoolean,
  IsNumber,
  IsPositive,
  Length,
  validate,
} from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { Transform } from 'class-transformer';

type Checkbox = {
  value: string | boolean;
};

export class AccountFormObject {
  @Length(1, 255)
  public declare name: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value as string))
  public declare amount: number;

  @IsBoolean()
  @Transform(
    ({ value }: Checkbox) => String(value) === 'true' || String(value) === 'on',
  )
  public debt = false;

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true });
  }
}
