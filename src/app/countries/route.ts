import { Router } from 'express'
import { checkAuth } from '../../common/middlewares/check-auth.js'
import { CountryController } from './controller.js'

export const countryRouter = Router()

const { getCountries, getCountryByName } = new CountryController()

countryRouter.use(checkAuth).get('/', getCountries).get('/:country', getCountryByName)
