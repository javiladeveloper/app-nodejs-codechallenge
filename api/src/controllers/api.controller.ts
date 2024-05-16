import stringify from 'json-stringify-safe'
import { Request, Response } from 'express'
import { axiosRequest } from '../libs/utils/request'

export async function getTransaction(req: Request, res: Response) {
  const { id } = req.params
  const response = await axiosRequest('GET', `https://pokeapi.co/api/v2/pokemon/${id}`)
  const result = response?.data

  res.send(stringify(result))
}

export async function createTransaction(req: Request, res: Response) {
    const response = await axiosRequest('GET', 'https://pokeapi.co/api/v2/pokemon/ditto', req.body)

    const result = response?.data

  res.send(stringify(result))
}
