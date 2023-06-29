import { plainToInstance } from 'class-transformer';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { ServerLoaderParams } from '../types';
import { AccountFormObject } from '../form_objects/accounts';

export const accountLoader = (serverParams?: ServerLoaderParams) => {
  return async ({ params: { accountId } }: LoaderFunctionArgs) => {
    if (!accountId) {
      throw Error('missing account id');
    }

    const response = await fetch(
      `${serverParams?.host ?? ''}/api/accounts/${accountId}`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    if (response.status === 403) {
      return redirect('/authentication');
    }

    return plainToInstance(AccountFormObject, await response.json());
  };
};

export const accountsLoader = (serverParams?: ServerLoaderParams) => {
  return async () => {
    const response = await fetch(
      `${serverParams?.host ?? ''}/api/accounts`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    if (response.status === 403) {
      return redirect('/authentication');
    }

    return plainToInstance(AccountFormObject, await response.json());
  };
};
