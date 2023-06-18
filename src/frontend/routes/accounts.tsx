import * as React from 'react';
import { Link, Outlet, useLoaderData, useRouteError } from 'react-router-dom';
import Nav from '../nav';
import { AccountFormObject } from '../form_objects/accounts';
import {
  accountLoader,
  accountsLoader,
  ServerLoaderParams,
} from '../loaders/accounts';
import { createAccountAction, updateAccountAction } from '../actions/accounts';
import { EditAccount, NewAccount } from './account';

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

export const Accounts = () => {
  const accounts = useLoaderData() as (AccountFormObject & { id: string })[];
  return (
    <div>
      <Link to={'new'}>New</Link>
      {accounts.map((account) => (
        <div key={account.id}>
          <Link to={account.id}>
            Account {account.id} &mdash; {account.amount}
          </Link>
        </div>
      ))}
    </div>
  );
};

export const generateAccountRoutes = (
  serverLoaderParams?: ServerLoaderParams,
) => {
  return {
    path: '/accounts',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Accounts />,
        loader: accountsLoader(serverLoaderParams),
        errorElement: <ErrorBoundary />,
      },
      {
        path: ':accountId',
        element: <EditAccount />,
        errorElement: <ErrorBoundary />,
        loader: accountLoader(serverLoaderParams),
        action: updateAccountAction,
      },
      {
        path: 'new',
        element: <NewAccount />,
        errorElement: <ErrorBoundary />,
        action: createAccountAction,
      },
    ],
  };
};
