import * as fs from 'fs';
import { config } from 'dotenv';

if (fs.existsSync('/secrets/application-cloud-run')) {
  config({ path: '/secrets/application-cloud-run' });
} else {
  config({ path: './.env' });
}

// eslint-disable-next-line import/order
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import morgan from 'morgan';
import { Profile } from 'passport-openidconnect';
import { AppModule } from './app.module';
import { AppLogger } from './logger/logger.service';
import SessionStore from './sessions/session.store';

declare module 'express-session' {
  interface SessionData {
    profile: Profile;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

enum Environment {
  Development = 'development',
  Production = 'production',
}

async function bootstrap() {
  const cookieSecret = process.env.COOKIE_SECRET;
  if (!cookieSecret) {
    throw Error('must set cookie secret');
  }

  const environment =
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Development;

  let appOptions: NestApplicationOptions = { bufferLogs: true };

  if (environment === Environment.Development) {
    appOptions = {
      ...appOptions,
      httpsOptions: {
        cert: fs.readFileSync('localhost.crt'),
        key: fs.readFileSync('localhost.key'),
      },
    };
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );

  if (environment === Environment.Production) {
    app.set('trust proxy', true);
  }

  app.useLogger(new AppLogger());
  app.use(morgan('combined'));
  app.useStaticAssets('./public');
  app.useStaticAssets('./static');
  app.setBaseViewsDir('./src/views');
  app.setViewEngine('pug');
  app.use(
    session({
      secret: cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        sameSite: 'lax',
      },
      store: new SessionStore(),
    }),
  );

  await app.listen(3000);
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
