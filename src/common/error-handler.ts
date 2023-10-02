import { NextFunction, Request, Response } from 'express'
import { CustomError } from './errors/custom-error.js'
import { ZodValidationError } from './errors/zod-validation.js'

/**
 * Global error handler to handle all error thrown by next() function 
 * */
export const errorHandler = (err: unknown | Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error occured!', err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() })
  }

  if(err instanceof ZodValidationError) {
    return res.status(err.statusCode).json(err.getErrors())
  }
  
  res.status(500).json({ message: 'Something went wrong!' })
}
