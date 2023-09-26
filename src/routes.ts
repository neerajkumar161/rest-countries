import { Router } from 'express'
import { userRouter } from './app/user/route.js'

export const indexRouter = Router()

indexRouter.use('/user', userRouter)
