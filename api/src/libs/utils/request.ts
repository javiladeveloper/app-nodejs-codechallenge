import axios from 'axios'
import createError from 'http-errors'

export async function axiosRequest(method: string, url: string, data = undefined) {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    return response
  } catch (error: any) {
    const { response } = error
    throw createError(response.data.statusCode, response.data.message)
  }
}
