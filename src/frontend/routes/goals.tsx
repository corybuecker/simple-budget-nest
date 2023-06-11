import * as React from 'react';
import { Link, Outlet, useLoaderData, useRouteError } from 'react-router-dom';
import Nav from '../nav';
import { goal as goalLoader, goals as goalsLoader } from '../loaders/goals';
import { EditGoal, NewGoal } from './goal';
import { createGoalAction, updateGoalAction } from '../actions/goals';
import { GoalFormObject } from '../form_objects/goals';

const Main = () => {
  return (
    <>
      <Nav></Nav>
      <div className={'p-2'}>
        <Outlet />
      </div>
    </>
  );
};
const ErrorBoundary = () => {
  const error = useRouteError() as { data: unknown };
  const errors = JSON.stringify(error.data, null, 2);

  return <pre>{errors}</pre>;
};

export const Goals = () => {
  const goals = useLoaderData() as (GoalFormObject & { id: string })[];
  return (
    <div>
      <Link to={'new'}>New</Link>
      {goals.map((goal) => (
        <div key={goal.id}>
          <Link to={goal.id || ''}>Goal {goal.id}</Link>
        </div>
      ))}
    </div>
  );
};
export const goalsRoutes = {
  path: '/goals',
  element: <Main />,

  children: [
    {
      index: true,
      errorElement: <ErrorBoundary />,
      element: <Goals />,
      loader: goalsLoader,
    },
    {
      path: 'new',
      element: <NewGoal />,
      errorElement: <ErrorBoundary />,
      action: createGoalAction,
    },
    {
      path: ':goalId',
      element: <EditGoal />,
      errorElement: <ErrorBoundary />,
      loader: goalLoader,
      action: updateGoalAction,
    },
  ],
};
