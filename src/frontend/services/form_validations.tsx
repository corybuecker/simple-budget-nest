import { ValidationError } from 'class-validator/types/validation/ValidationError';
import * as React from 'react';
import { Dispatch, FormEvent, JSX, SetStateAction } from 'react';
import { SubmitFunction } from 'react-router-dom';

export type FormError<T> =
  | Record<string, never>
  | {
      [K in keyof T]: JSX.Element;
    };

export type FormValidator = (fd: FormData) => Promise<ValidationError[]>;

export function buildFormValidator<T>(
  formValidator: FormValidator,
  setFormErrors: Dispatch<SetStateAction<FormError<T>>>,
  submitForm: SubmitFunction,
) {
  const onChange = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const errors = await formValidator(new FormData(form));
    const mappedErrors: FormError<T> = errors.reduce((memo, error) => {
      return {
        ...memo,
        [error.property]: (
          <span>{Object.values(error.constraints ?? {}).join(', ')}</span>
        ),
      };
    }, {});

    setFormErrors(mappedErrors);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e && e.preventDefault && e.preventDefault();

    const form = e.currentTarget;
    const errors = await formValidator(new FormData(form));

    if (errors.length === 0) {
      submitForm(form);
    } else {
      const mappedErrors: FormError<T> = errors.reduce((memo, error) => {
        return {
          ...memo,
          [error.property]: (
            <span>{Object.values(error.constraints ?? {}).join(', ')}</span>
          ),
        };
      }, {});

      setFormErrors(mappedErrors);
    }
  };

  return { onChange, onSubmit };
}
