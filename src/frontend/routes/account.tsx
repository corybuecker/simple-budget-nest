import { plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import * as React from 'react';
import { useState } from 'react';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { AccountFormObject } from '../form_objects/accounts';
import {
  buildFormValidator,
  FormError,
  FormValidator,
} from '../services/form_validations';
import { primaryButton } from '../styles/buttons';

export const formValidator: FormValidator = (
  formData: FormData,
): Promise<ValidationError[]> => {
  const accountValidator = plainToInstance(
    AccountFormObject,
    Object.fromEntries(formData),
  );

  return accountValidator.validate();
};

export const EditAccount = () => {
  const [formValues, setFormValues] = useState<AccountFormObject>(
    useLoaderData() as AccountFormObject,
  );

  const [formErrors, setFormErrors] = useState<FormError<AccountFormObject>>(
    {},
  );

  const { onSubmit, onChange } = buildFormValidator<AccountFormObject>(
    formValidator,
    setFormErrors,
    useSubmit(),
  );

  return (
    <Form
      method="put"
      onChange={onChange}
      onSubmit={onSubmit}
      className={'flex flex-col gap-4 max-w-md'}
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
              Object.assign({}, formValues, {
                name: e.target.value,
              }),
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
          onChange={(e) => {
            setFormValues(
              Object.assign({}, formValues, {
                amount: e.target.value,
              }),
            );
          }}
          className={'border p-2'}
        />
        {formErrors.amount && (
          <span className={'bg-amber-200'}>{formErrors.amount}</span>
        )}
      </div>
      <div className={'flex gap-3'}>
        <input
          type={'checkbox'}
          name={'debt'}
          id={'debt'}
          checked={formValues.debt}
          onChange={(e) => {
            setFormValues(
              Object.assign({}, formValues, {
                debt: e.target.checked,
              }),
            );
          }}
          className={'w-4'}
        />
        <label htmlFor={'debt'}>Debt</label>
        {formErrors.debt && (
          <span className={'bg-amber-200'}>{formErrors.debt}</span>
        )}
      </div>
      <button
        className={primaryButton}
        disabled={Object.values(formErrors).length > 0}
        type="submit"
      >
        Save
      </button>
    </Form>
  );
};
export const NewAccount = () => {
  const [formErrors, setFormErrors] = useState<FormError<AccountFormObject>>(
    {},
  );

  const { onChange, onSubmit } = buildFormValidator<AccountFormObject>(
    formValidator,
    setFormErrors,
    useSubmit(),
  );

  return (
    <Form
      method="post"
      onSubmit={onSubmit}
      onChange={onChange}
      className={'flex flex-col gap-4 max-w-2xl'}
    >
      <div className={'flex flex-col gap-4 max-w-md'}>
        <fieldset className={'flex flex-col'}>
          <label htmlFor={'name'}>Name</label>
          <input className={'form-input'} name="name" />
          {formErrors.name && (
            <span className={'bg-amber-200'}>{formErrors.name}</span>
          )}
        </fieldset>
        <fieldset className={'flex flex-col'}>
          <label htmlFor={'amount'}>Amount</label>
          <input className={'form-input'} type="number" name="amount" />
          {formErrors.amount && (
            <span className={'bg-amber-200'}>{formErrors.amount}</span>
          )}
        </fieldset>
        <fieldset className={'flex gap-3 items-center'}>
          <input
            className={'form-checkbox'}
            type={'checkbox'}
            id={'debt'}
            name={'debt'}
          />
          <label htmlFor={'debt'}>Debt</label>
        </fieldset>
        <button
          className={primaryButton}
          disabled={Object.values(formErrors).length > 0}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
};
