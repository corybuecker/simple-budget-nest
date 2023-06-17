import { Injectable } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import * as React from 'react';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Outlet } from 'react-router-dom';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import ErrorPage from '../frontend/errors';
import { ServerLoaderParams } from '../frontend/loaders/accounts';
import Nav from '../frontend/nav';
import { generateAccountRoutes } from '../frontend/routes/accounts';
import Authentication from '../frontend/routes/authentication';
import { generateGoalsRoutes } from '../frontend/routes/goals';
import { generateSavingsRoutes } from '../frontend/routes/savings';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class RootService {
  constructor(private logger: AppLogger) {}
  public async pageContent(request: ExpressRequest) {
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

    const serverLoaderParams: ServerLoaderParams = {
      headers: this.expressToHeaders(request),
      host: 'http://localhost:3000',
    };

    const routes = [
      {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
      },
      { path: '/authentication', element: <Authentication /> },
      generateAccountRoutes(serverLoaderParams),
      generateGoalsRoutes(serverLoaderParams),
      generateSavingsRoutes(serverLoaderParams),
    ];

    const handler = createStaticHandler(routes);
    const fetchRequest = this.createFetchRequest(request);
    const context = await handler.query(fetchRequest);

    if (context instanceof Response) {
      this.logger.error(JSON.stringify(context.headers));
      throw context;
    }

    const router = createStaticRouter(handler.dataRoutes, context);

    return renderToString(
      <StrictMode>
        <StaticRouterProvider router={router} context={context} />
      </StrictMode>,
    );
  }

  private createFetchRequest(request: ExpressRequest) {
    const origin = `http://locahost:3000`;
    const url = new URL(request.url, origin);

    const controller = new AbortController();
    request.on('close', () => controller.abort());

    const init = {
      headers: this.expressToHeaders(request),
      signal: controller.signal,
    };

    return new Request(url.href, init);
  }

  private expressToHeaders(request: ExpressRequest) {
    const headers = new Headers();

    for (const [key, values] of Object.entries(request.headers)) {
      if (values) {
        if (Array.isArray(values)) {
          for (const value of values) {
            headers.append(key, value);
          }
        } else {
          headers.set(key, values);
        }
      }
    }

    return headers;
  }
}
