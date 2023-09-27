import { Router } from 'express'
import { CountryController } from './controller.js'

export const countryRouter = Router()

const { getCountries, getCountryByName } = new CountryController()

countryRouter.get('/', getCountries).get('/:country', getCountryByName)
