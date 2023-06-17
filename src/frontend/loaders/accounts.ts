import { plainToInstance } from 'class-transformer';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { AccountFormObject } from '../form_objects/accounts';

export const account = async (
  { params: { accountId } }: LoaderFunctionArgs,
  headers?: Headers,
) => {
  if (!accountId) {
    throw Error('missing account id');
  }

  const response = await fetch(
    `http://localhost:3000/api/accounts/${accountId}`,
    headers ? { headers } : {},
  );

  if (response.status === 403) {
    return redirect('/authentication');
  }

  return plainToInstance(AccountFormObject, await response.json());
};

export const accounts = async (headers?: Headers) => {
  const response = await fetch(
    'http://localhost:3000/api/accounts',
    headers ? { headers } : {},
  );

  if (response.status === 403) {
    return redirect('/authentication');
  }

  return plainToInstance(AccountFormObject, await response.json());
};
