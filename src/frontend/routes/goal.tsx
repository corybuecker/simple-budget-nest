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
import { GoalFormObject, GoalRecurrence } from '../form_objects/goals';

export const formValidator: FormValidator = async (
  formData: FormData,
): Promise<ValidationError[]> => {
  const goalValidator = plainToInstance(
    GoalFormObject,
    Object.fromEntries(formData),
  );

  return goalValidator.validate();
};

export const EditGoal = () => {
  const [formValues, setFormValues] = useState<GoalFormObject>(
    useLoaderData() as GoalFormObject,
  );

  const [formErrors, setFormErrors] = useState<FormError<GoalFormObject>>({});

  const validate = buildFormValidator<GoalFormObject>(
    formValidator,
    setFormErrors,
  );

  const targetDate = formValues.targetDate;
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateParts = formatter.formatToParts(targetDate);
  const year = dateParts.find((p) => p.type === 'year')?.value;
  const month = dateParts.find((p) => p.type === 'month')?.value;
  const day = dateParts.find((p) => p.type === 'day')?.value;
  const targetDateFormValue = [year, month, day].join('-');

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
          onChange={(e) =>
            setFormValues(
              Object.assign({}, formValues, { name: e.target.value }),
            )
          }
          value={formValues.name}
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
          onChange={(e) =>
            setFormValues(
              Object.assign({}, formValues, { amount: e.target.value }),
            )
          }
          value={formValues.amount}
          className={'border p-2'}
        />
        {formErrors.amount && (
          <span className={'bg-amber-200'}>{formErrors.amount}</span>
        )}
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'targetDate'} className={'font-bold'}>
          Target date
        </label>
        <input
          type={'date'}
          name={'targetDate'}
          id={'targetDate'}
          onChange={(e) =>
            setFormValues(
              Object.assign({}, formValues, { targetDate: e.target.value }),
            )
          }
          value={targetDateFormValue}
          className={'border p-2'}
        />
        {formErrors.amount && (
          <span className={'bg-amber-200'}>{formErrors.amount}</span>
        )}
      </div>
      <select
        name="recurrence"
        value={formValues.recurrence}
        onChange={(e) => {
          setFormValues(
            Object.assign({}, formValues, { recurrence: e.target.value }),
          );
        }}
      >
        <option value={GoalRecurrence.NEVER}>{GoalRecurrence.NEVER}</option>
        <option value={GoalRecurrence.DAILY}>{GoalRecurrence.DAILY}</option>
        <option value={GoalRecurrence.WEEKLY}>{GoalRecurrence.WEEKLY}</option>
        <option value={GoalRecurrence.MONTHLY}>{GoalRecurrence.MONTHLY}</option>
        <option value={GoalRecurrence.QUARTERLY}>
          {GoalRecurrence.QUARTERLY}
        </option>
        <option value={GoalRecurrence.YEARLY}>{GoalRecurrence.YEARLY}</option>
      </select>
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  );
};
export const NewGoal = () => {
  const [formErrors, setFormErrors] = useState<FormError<GoalFormObject>>({});

  const validate = buildFormValidator<GoalFormObject>(
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
      <label htmlFor={'recurrence'}>Recurrence</label>
      <select name="recurrence">
        <option value={GoalRecurrence.NEVER}>{GoalRecurrence.NEVER}</option>
        <option value={GoalRecurrence.DAILY}>{GoalRecurrence.DAILY}</option>
        <option value={GoalRecurrence.WEEKLY}>{GoalRecurrence.WEEKLY}</option>
        <option value={GoalRecurrence.MONTHLY}>{GoalRecurrence.MONTHLY}</option>
        <option value={GoalRecurrence.QUARTERLY}>
          {GoalRecurrence.QUARTERLY}
        </option>
        <option value={GoalRecurrence.YEARLY}>{GoalRecurrence.YEARLY}</option>
      </select>
      {formErrors.recurrence && (
        <span className={'bg-amber-200'}>{formErrors.recurrence}</span>
      )}
      <label htmlFor={'targetDate'}>Target date</label>
      <input type="date" name="targetDate" />
      {formErrors.targetDate && (
        <span className={'bg-amber-200'}>{formErrors.targetDate}</span>
      )}
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  );
};
