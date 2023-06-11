import { ValidationError } from 'class-validator/types/validation/ValidationError';
import * as React from 'react';
import { Dispatch, JSX, SetStateAction } from 'react';

export type FormError<T> =
  | Record<string, never>
  | {
      [K in keyof T]: JSX.Element;
    };

export type FormValidator = (fd: FormData) => Promise<ValidationError[]>;

export function buildFormValidator<T>(
  formValidator: FormValidator,
  setFormErrors: Dispatch<SetStateAction<FormError<T>>>,
) {
  return async (e: React.SyntheticEvent) => {
    const input: HTMLInputElement = e.target as HTMLInputElement;

    if (!input.form) {
      return;
    }

    const errors = await formValidator(new FormData(input.form));

    const mappedErrors = errors.reduce((memo, error) => {
      return {
        ...memo,
        [error.property]: (
          <span>{Object.values(error.constraints ?? {}).join(', ')}</span>
        ),
      };
    }, {});

    setFormErrors(mappedErrors as FormError<T>);
  };
}
