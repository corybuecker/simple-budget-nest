import { ValidationError } from 'class-validator/types/validation/ValidationError';
import * as React from 'react';
import { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';

import {
  buildFormValidator,
  FormError,
  FormValidator,
} from '../services/form_validations';
import { plainToInstance } from 'class-transformer';
import { SavingFormObject } from '../form_objects/savings';

export const formValidator: FormValidator = async (
  formData: FormData,
): Promise<ValidationError[]> => {
  const savingValidator = plainToInstance(
    SavingFormObject,
    Object.fromEntries(formData),
  );

  return savingValidator.validate();
};

export const EditSaving = () => {
  const [formValues, setFormValues] = useState<SavingFormObject>(
    useLoaderData() as SavingFormObject,
  );

  const [formErrors, setFormErrors] = useState<FormError<SavingFormObject>>({});

  const validate = buildFormValidator<SavingFormObject>(
    formValidator,
    setFormErrors,
  );

  return (
    <Form
      method="put"
      onChange={validate}
      className={'flex flex-col gap-4 max-w-2xl'}
    >
      <div className={'flex flex-col'}>
        <label htmlFor={'name'} className={'font-bold'}>
          Name
        </label>
        <input
          name={'name'}
          id={'name'}
          value={formValues.name}
          onChange={(e) =>
            setFormValues(
              Object.assign({}, formValues, { name: e.target.value }),
            )
          }
          className={'border p-2'}
        />
        {formErrors.name && (
          <span className={'bg-amber-200'}>{formErrors.name}</span>
        )}
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'amount'} className={'font-bold'}>
          Amount
        </label>
        <input
          type={'number'}
          name={'amount'}
          id={'amount'}
          value={formValues.amount}
          onChange={(e) =>
            setFormValues(
              Object.assign({}, formValues, { amount: Number(e.target.value) }),
            )
          }
          className={'border p-2'}
        />
        {formErrors.amount && (
          <span className={'bg-amber-200'}>{formErrors.amount}</span>
        )}
      </div>
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  );
};
export const NewSaving = () => {
  const [formErrors, setFormErrors] = useState<FormError<SavingFormObject>>({});

  const validate = buildFormValidator<SavingFormObject>(
    formValidator,
    setFormErrors,
  );

  return (
    <Form method="post" onChange={validate}>
      <div>{JSON.stringify(formErrors)}</div>
      <label htmlFor={'name'}>Name</label>
      <input name="name" />
      {formErrors.name && (
        <span className={'bg-amber-200'}>{formErrors.name}</span>
      )}
      <label htmlFor={'amount'}>Amount</label>
      <input type="number" name="amount" />
      {formErrors.amount && (
        <span className={'bg-amber-200'}>{formErrors.amount}</span>
      )}
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  );
};
