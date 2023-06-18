import { plainToInstance } from 'class-transformer';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { ServerLoaderParams } from '../../shared/types';
import { GoalFormObject } from '../form_objects/goals';

export const goalLoader = (serverParams?: ServerLoaderParams) => {
  return async ({ params: { goalId } }: LoaderFunctionArgs) => {
    if (!goalId) return;

    const response = await fetch(
      `${serverParams?.host ?? ''}/api/goals/${goalId}`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    return plainToInstance(GoalFormObject, await response.json());
  };
};

export const goalsLoader = (serverParams?: ServerLoaderParams) => {
  return async () => {
    const response = await fetch(
      `${serverParams?.host ?? ''}/api/goals`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    if (response.status === 403) {
      return redirect('/authentication');
    }

    if (!response.ok) {
      throw response;
    }

    return plainToInstance(GoalFormObject, await response.json());
  };
};
