import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logger/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import morgan from 'morgan';
import session from 'express-session';
import SessionStore from './sessions/session.store';
import { Profile } from 'passport-openidconnect';
import { User as UserModel } from './users/user.model';
import helmet from 'helmet';

declare module 'express-session' {
  interface SessionData {
    profile: Profile;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      simpleBudgetUser: UserModel;
    }
  }
}

async function bootstrap() {
  const cookieSecret = process.env.COOKIE_SECRET;
  if (!cookieSecret) {
    throw Error('must set cookie secret');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      },
      store: new SessionStore(),
    }),
  );
  if (process.env.NODE_ENV === 'production') {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            'script-src': ["'self'", 'ga.jspm.io'],
          },
        },
      }),
    );
  }

  await app.listen(3000);
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
