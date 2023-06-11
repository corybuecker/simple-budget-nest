import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { SavingFormObject } from '../form_objects/savings';
import { plainToInstance } from 'class-transformer';

export const saving = async ({ params: { savingId } }: LoaderFunctionArgs) => {
  if (!savingId) return;

  const response = await fetch(`/api/savings/${savingId}`);

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(SavingFormObject, await response.json());
};

export const savings = async () => {
  const response = await fetch('/api/savings');

  if (response.status === 403) {
    return redirect('/authentication');
  }

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(SavingFormObject, await response.json());
};
