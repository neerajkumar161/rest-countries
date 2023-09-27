import { Response } from 'express'

type TStatusCode = 200 | 201 | 400 | 500 | 501

export const sendResponse = (res: Response, code: TStatusCode, message: string, data: any = null) => {
  return res.status(code).json({
    message,
    data,
    code
  })
}
