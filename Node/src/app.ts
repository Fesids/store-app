import express, {Request, Response, NextFunction, Application as ExpressApplication, application} from 'express';
import expressRateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser'
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp'
import xss from 'xss-clean';
import bodyParser from 'body-parser';
import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils'

import sendError from './utils/sendError';
import { errorHandler } from './interfaces/http/middlewares/ErrorHandler';
import config from "./config/main";
import { applicationContainerModule } from './application/container';

// CONTROLLERS

import './interfaces/http/controllers/ApplicationController'
import './interfaces/http/controllers/UserController'
import './interfaces/http/controllers/CommonController'
import './interfaces/http/controllers/AuthController'

// *** //
import { infraestructureContainerModule } from './infra/container';
/*
const app = express();

const limiter = expressRateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests.',
    standardHeaders: true,
    legacyHeaders: false
});

app.use(cookieParser());
app.use(express.json({limit: '10kb'}));

app.use(limiter)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(ExpressMongoSanitize());

app.get("", (req:Request, res:Response)=> {
    res.send("Ok ok")
})

app.all('*', (req:Request, res:Response, next:NextFunction) => {
    next(sendError(404, 'fail', `Unsupported URL: ${req.originalUrl}`))
})

export default app;*/

//* TESTE

// Rate limit middleware
const limiter = expressRateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests.',
  standardHeaders: true,
  legacyHeaders: false,
});

const initialise = async () => {
  const container = new Container();
  container.load(applicationContainerModule);
  await container.loadAsync(infraestructureContainerModule)

  const server = new InversifyExpressServer(container);

  server.setConfig((app: ExpressApplication) => {
    // Security & Middleware setup
    app.use(cookieParser());
    app.use(express.json({ limit: '10kb' }));
    app.use(limiter);

    // CORS Handling
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });

    app.use(helmet());
    app.use(hpp());
    app.use(xss());
    app.use(ExpressMongoSanitize());

    // Body parser middleware
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());

    // Default Route
    app.get('', (req: Request, res: Response) => {
      res.send('Ok ok');
    });

    container.bind<ExpressApplication>('ExpressApplication').toConstantValue(app)
  });

  server.setErrorConfig((app: ExpressApplication) => {
    app.use(errorHandler); // Error handler middleware
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(sendError(404, 'fail', `Unsupported URL: ${req.originalUrl}`));
    });
  });

  const apiServer = server.build();
  /*apiServer.listen(config.API_PORT, () =>
    console.log('The application is initialised on the port %s', config.API_PORT)
  );*/

  return container;
};

export { initialise };
