import * as React from 'react';
import { Link, Outlet, useLoaderData, useRouteError } from 'react-router-dom';
import { ServerLoaderParams } from '../../shared/types';
import { createSavingAction, updateSavingAction } from '../actions/savings';
import { SavingFormObject } from '../form_objects/savings';
import { savingLoader, savingsLoader } from '../loaders/savings';
import Nav from '../nav';
import { EditSaving, NewSaving } from './saving';

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
export const Savings = () => {
  const savings = useLoaderData() as (SavingFormObject & { id: string })[];
  return (
    <div>
      <Link to={'new'}>New</Link>
      {savings.map((saving) => (
        <div key={saving.id}>
          <Link to={saving.id || ''}>Saving {saving.id}</Link>
        </div>
      ))}
    </div>
  );
};

const ErrorBoundary = () => {
  const error = useRouteError() as { data: unknown };
  const errors = JSON.stringify(error.data, null, 2);

  return <pre>{errors}</pre>;
};

export const generateSavingsRoutes = (
  serverLoaderParams?: ServerLoaderParams,
) => {
  return {
    path: '/savings',
    element: <Main />,
    children: [
      {
        index: true,
        errorElement: <ErrorBoundary />,
        element: <Savings />,
        loader: savingsLoader(serverLoaderParams),
      },
      {
        path: 'new',
        element: <NewSaving />,
        errorElement: <ErrorBoundary />,
        action: createSavingAction,
      },
      {
        path: ':savingId',
        element: <EditSaving />,
        errorElement: <ErrorBoundary />,
        loader: savingLoader(serverLoaderParams),
        action: updateSavingAction,
      },
    ],
  };
};
