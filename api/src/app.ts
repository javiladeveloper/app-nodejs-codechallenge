import express, { Application, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { httpErrorHandler } from './middlewares/transaction.middlewares'
import { createTransaction, getTransaction } from './controllers/api.controller'

class App {
  readonly expressApp: Application

  constructor() {
    this.expressApp = express()
    this.Middlewares()
    this.Routes()
    this.ErrorHandler()

  }

  Middlewares(): void {
    this.expressApp.use(express.json())
    this.expressApp.use(express.urlencoded({ extended: true }))
  }

  Routes(): void {
    this.expressApp.get('/status', (req: Request, res: Response) => {
      res.json({ time: new Date() })
    })
    this.expressApp.get('/transaction/:id',expressAsyncHandler(getTransaction))
    this.expressApp.post('/transaction', expressAsyncHandler(createTransaction))
    this.expressApp.use('*', (req: Request, res: Response) => {
      res.status(404).json({ message: 'Invalid path' })
    })
  }

  ErrorHandler(){
    this.expressApp.use(httpErrorHandler)
  }
}

export default new App().expressApp
