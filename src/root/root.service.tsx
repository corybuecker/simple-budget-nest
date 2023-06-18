import { Injectable } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import * as React from 'react';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { AppLogger } from '../logger/logger.service';
import { generateRoutes } from '../shared/route_generator';
import { ServerLoaderParams } from '../shared/types';

@Injectable()
export class RootService {
  constructor(private logger: AppLogger) {}
  public async pageContent(request: ExpressRequest) {
    const serverLoaderParams: ServerLoaderParams = {
      headers: this.expressToHeaders(request),
      host: 'https://localhost:3000',
    };

    const routes = generateRoutes(serverLoaderParams);
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
    const origin = `https://locahost:3000`;
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
