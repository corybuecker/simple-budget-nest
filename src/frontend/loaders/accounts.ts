import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { plainToInstance } from 'class-transformer';
import { AccountFormObject } from '../form_objects/accounts';

export const account = async ({
  params: { accountId },
}: LoaderFunctionArgs) => {
  if (!accountId) {
    throw Error('missing account id');
  }

  const response = await fetch(`/api/accounts/${accountId}`);

  if (response.status === 403) {
    return redirect('/authentication');
  }

  return plainToInstance(AccountFormObject, await response.json());
};

export const accounts = async () => {
  const response = await fetch('/api/accounts');

  if (response.status === 403) {
    return redirect('/authentication');
  }

  return plainToInstance(AccountFormObject, await response.json());
};
