import { Router } from 'express'
import { countryRouter } from './app/countries/route.js'
import { userRouter } from './app/user/route.js'

export const indexRouter = Router()

indexRouter.use('/user', userRouter).use('/countries', countryRouter)
