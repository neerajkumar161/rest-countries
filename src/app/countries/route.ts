import { Router } from 'express'
import { checkAuth } from '../../common/middlewares/check-auth.js'
import { CountryController } from './controller.js'

export const countryRouter = Router()

const { getCountries, getCountryByName } = new CountryController()

countryRouter
  /* checkAuth will apply to all routes below it */
  .use(checkAuth)
  .get('/', getCountries)
  .get('/:country', getCountryByName)
