import { Router } from 'express'
import { countryRouter } from './app/countries/route.js'
import { userRouter } from './app/user/route.js'

export const indexRouter = Router()

indexRouter
  /* User onboarding routes */
  .use('/user', userRouter)
  /* Countries routes to fetch all details */
  .use('/countries', countryRouter)
