import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { generateRoutes } from './route_generator';

const router = createBrowserRouter(generateRoutes());
const mainElements = document.getElementsByTagName('main');
const mainElement = mainElements.item(0);

if (mainElement) {
  createRoot(mainElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
