import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { plainToInstance } from 'class-transformer';
import { GoalFormObject } from '../form_objects/goals';

export const goal = async ({ params: { goalId } }: LoaderFunctionArgs) => {
  if (!goalId) return;

  const response = await fetch(`/api/goals/${goalId}`);

  return plainToInstance(GoalFormObject, await response.json());
};

export const goals = async () => {
  const response = await fetch('/api/goals');

  if (response.status === 403) {
    return redirect('/authentication');
  }

  if (!response.ok) {
    throw response;
  }

  return plainToInstance(GoalFormObject, await response.json());
};
