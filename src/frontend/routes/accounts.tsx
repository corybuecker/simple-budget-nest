import * as React from 'react';
import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useRouteError,
} from 'react-router-dom';
import { createAccountAction, updateAccountAction } from '../actions/accounts';
import { AccountFormObject } from '../form_objects/accounts';
import {
  account as accountLoader,
  accounts as accountsLoader,
} from '../loaders/accounts';
import Nav from '../nav';
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
          <Link to={account.id}>Account {account.id}</Link>
        </div>
      ))}
    </div>
  );
};

export const generateAccountRoutes = (indexHeaders?: Headers) => {
  return {
    path: '/accounts',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Accounts />,
        loader: () => accountsLoader(indexHeaders),
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'new',
        element: <NewAccount />,
        errorElement: <ErrorBoundary />,
        action: createAccountAction,
      },
      {
        path: ':accountId',
        element: <EditAccount />,
        errorElement: <ErrorBoundary />,
        loader: (args: LoaderFunctionArgs) => accountLoader(args, indexHeaders),
        action: updateAccountAction,
      },
    ],
  };
};
