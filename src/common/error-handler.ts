import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error occured!', err)
  res.status(500).json({ message: 'Error occured' })
}
