import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { TransactionInfrastructure } from './transaction/infrastructure/transaction.infrastructure';
import { TransactionApplication } from './transaction/application/transaction.application';
import { TransactionController } from './transaction/infrastructure/interface/controller/transaction.controller';
import { TransactionRoute } from './transaction/infrastructure/interface/route/transaction.route';
import {
  corsOptionsDelegate,
  httpErrorHandler,
} from './core/middlewares/transaction.middlewares';
import { BrokerInfrastructure } from './transaction/infrastructure/broker.infrastructure';
import { RedisInfrastructure } from './transaction/infrastructure/redis.infrastructure';

class App {
  private readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private initializeMiddlewares() {
    this.expressApp.use(cors(corsOptionsDelegate));
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    const infrastructure = new TransactionInfrastructure();
    const broker = new BrokerInfrastructure();
    const redis = new RedisInfrastructure();
    const application = new TransactionApplication(
      infrastructure,
      broker,
      redis,
    );
    const controller = new TransactionController(application);
    const route = new TransactionRoute(controller);

    this.expressApp.get('/status', (req: Request, res: Response) => {
      res.json('HOLA MUNDO');
    });
    this.expressApp.use('/transaction', route.router);
    this.expressApp.use('*', (req: Request, res: Response) => {
      res.status(404).json({ message: 'Invalid path' });
    });
  }

  private initializeErrorHandler() {
    this.expressApp.use(httpErrorHandler);
  }

  public get app() {
    return this.expressApp;
  }
}

export default new App().app;
