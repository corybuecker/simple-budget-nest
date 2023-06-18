import * as React from 'react';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import ErrorPage from './errors';
import Nav from './nav';
import { generateAccountRoutes } from './routes/accounts';
import Authentication from './routes/authentication';
import { generateGoalsRoutes } from './routes/goals';
import { generateSavingsRoutes } from './routes/savings';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  { path: '/authentication', element: <Authentication /> },
  generateAccountRoutes(),
  generateGoalsRoutes(),
  generateSavingsRoutes(),
]);

const mainElements = document.getElementsByTagName('main');
const mainElement = mainElements.item(0);

if (mainElement) {
  hydrateRoot(
    mainElement,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
