import { Handler } from 'express'
import { sendResponse } from '../../common/response-json.js'
import { ICountryController, TCountry } from './interface.js'

let countries: TCountry[] = []

const BASE_URL = 'https://restcountries.com/v3.1'

export class CountryController implements ICountryController {
  getCountries: Handler = async (req, res, next) => {
    try {
      const { population, area, language } = req.query
      let filteredCountries: TCountry[] = []
      // population filter, population = 1380004385
      // area = 3287590.0
      // languages = eng, hin, tam
      if (!countries.length) {
        const response = await fetch(`${BASE_URL}/all`, { method: 'GET' })
        countries = await response.json()
      }

      for (let i = 0; i < countries.length; i++) {
        const country = countries[i]
        if (population && country.population === +population) {
          filteredCountries.push(country)
        } else if (area && country.area === +area) {
          filteredCountries.push(country)
        } else if (language && country.languages) {
          if (country.languages[language as string]) {
            filteredCountries.push(country)
          }
        }
      }

      if (!area && !population && !language) {
        filteredCountries = countries
      }

      sendResponse(res, 200, 'All Countries fetched', filteredCountries)
    } catch (error) {
      next(error)
    }
  }

  getCountryByName: Handler = async (req, res, next) => {
    try {
      const { country } = req.params

      const response = await fetch(`${BASE_URL}/name/${country.toLowerCase()}`, { method: 'GET' })

      const countryDetails: TCountry = await response.json()

      sendResponse(res, 200, 'Country Details fetched!', countryDetails)
    } catch (error) {
      next(error)
    }
  }
}
