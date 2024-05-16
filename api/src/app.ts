import express, { Application, Request, Response } from 'express'
import { createTransaction, getTransaction } from './controllers/api.controller'

class App {
  readonly expressApp: Application

  constructor() {
    this.expressApp = express()
    this.mountMiddlewares()
    this.mountRoutes()
  }

  mountMiddlewares(): void {
    this.expressApp.use(express.json())
    this.expressApp.use(express.urlencoded({ extended: true }))
  }

  mountRoutes(): void {
    this.expressApp.get('/status', (req: Request, res: Response) => {
      res.json({ time: new Date() })
    })
    this.expressApp.get('/transaction/:id',getTransaction)
    this.expressApp.post('/transaction', createTransaction)
    this.expressApp.use('*', (req: Request, res: Response) => {
      res.status(404).json({ message: 'Invalid path' })
    })
  }
}

export default new App().expressApp
