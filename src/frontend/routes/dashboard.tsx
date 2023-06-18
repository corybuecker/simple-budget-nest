import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ServerLoaderParams } from '../../shared/types';
import { dashboardLoader } from '../loaders/dashboard';
import Nav from '../nav';

const Main = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <Nav></Nav>
      <div className={'p-2'}>{JSON.stringify(data)}</div>
    </>
  );
};

export const generateDashboardRoutes = (
  serverLoaderParams?: ServerLoaderParams,
) => {
  return {
    path: '/dashboard',
    element: <Main />,
    loader: dashboardLoader(serverLoaderParams),
  };
};
