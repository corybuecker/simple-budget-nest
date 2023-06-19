import { Link, Outlet, useLoaderData, useRouteError } from 'react-router-dom';
import { ServerLoaderParams } from '../../shared/types';
import { createGoalAction, updateGoalAction } from '../actions/goals';
import { GoalFormObject } from '../form_objects/goals';
import { goalLoader, goalsLoader } from '../loaders/goals';
import Nav from '../nav';
import { primaryButton } from '../styles/buttons';
import { EditGoal, NewGoal } from './goal';

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
      <Link className={`${primaryButton} block max-w-xs`} to={'new'}>
        New
      </Link>
      <div className={'flex flex-col'}>
        {goals.map((goal) => (
          <div key={goal.id} className={'flex gap-4'}>
            <Link to={goal.id}>{goal.id}</Link>
            <span>{goal.name}</span>
            <span>{goal.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export const generateGoalsRoutes = (
  serverLoaderParams?: ServerLoaderParams,
) => {
  return {
    path: '/goals',
    element: <Main />,

    children: [
      {
        index: true,
        errorElement: <ErrorBoundary />,
        element: <Goals />,
        loader: goalsLoader(serverLoaderParams),
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
        loader: goalLoader(serverLoaderParams),
        action: updateGoalAction,
      },
    ],
  };
};
