import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { generateRoutes } from './route_generator';

const router = createBrowserRouter(generateRoutes());
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
