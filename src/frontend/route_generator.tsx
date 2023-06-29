import * as React from 'react';
import ErrorPage from './errors';
import { generateAccountRoutes } from './routes/accounts';
import Authentication from './routes/authentication';
import { generateDashboardRoutes } from './routes/dashboard';
import { generateGoalsRoutes } from './routes/goals';
import { generateSavingsRoutes } from './routes/savings';
import { Main } from './main';
import { ServerLoaderParams } from './types';

export const generateRoutes = (serverLoaderParams?: ServerLoaderParams) => [
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  { path: '/authentication', element: <Authentication /> },
  generateAccountRoutes(serverLoaderParams),
  generateGoalsRoutes(serverLoaderParams),
  generateSavingsRoutes(serverLoaderParams),
  generateDashboardRoutes(serverLoaderParams),
];
