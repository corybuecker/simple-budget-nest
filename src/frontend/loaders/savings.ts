import { plainToInstance } from 'class-transformer';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { ServerLoaderParams } from '../types';
import { SavingFormObject } from '../form_objects/savings';

export const savingLoader = (serverParams?: ServerLoaderParams) => {
  return async ({ params: { savingId } }: LoaderFunctionArgs) => {
    if (!savingId) return;

    const response = await fetch(
      `${serverParams?.host ?? ''}/api/savings/${savingId}`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    if (!response.ok) {
      throw response;
    }

    return plainToInstance(SavingFormObject, await response.json());
  };
};

export const savingsLoader = (serverParams?: ServerLoaderParams) => {
  return async () => {
    const response = await fetch(
      `${serverParams?.host ?? ''}/api/savings`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    if (response.status === 403) {
      return redirect('/authentication');
    }

    if (!response.ok) {
      throw response;
    }

    return plainToInstance(SavingFormObject, await response.json());
  };
};
