import * as React from 'react';
import ErrorPage from '../frontend/errors';
import { generateAccountRoutes } from '../frontend/routes/accounts';
import Authentication from '../frontend/routes/authentication';
import { generateDashboardRoutes } from '../frontend/routes/dashboard';
import { generateGoalsRoutes } from '../frontend/routes/goals';
import { generateSavingsRoutes } from '../frontend/routes/savings';
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
