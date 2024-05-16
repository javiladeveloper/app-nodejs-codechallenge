import http from 'http'
import app from '../app'
import { EnvConfig } from '../libs/utils/env-config'
import { Bootstrap } from './bootstrap'

export default class ServerBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const { port } = EnvConfig
      const server = http.createServer(app)
      server
        .listen(port)
        .on('listening', () => {
          resolve(true)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }
}
