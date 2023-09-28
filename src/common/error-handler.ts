import { NextFunction, Request, Response } from 'express'
import { CustomError } from './errors/custom-error.js'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error occured!', err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() })
    
  }
  res.status(500).json({ message: 'Something went wrong!' })
}
