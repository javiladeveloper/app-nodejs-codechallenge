import stringify from 'json-stringify-safe'
import { Request, Response } from 'express'
import axios from 'axios'

export async function getTransaction(req: Request, res: Response) {
  const { id } = req.params
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/ditto'

  )
  const result = response?.data

  res.send(stringify(result))
}

export async function createTransaction(req: Request, res: Response) {
    const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/ditto'
    
      )
    console.log(response)
    const result = response?.data

  res.send(stringify(result))
}
