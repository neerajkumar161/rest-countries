import { Handler } from 'express'
import { BadRequestException } from '../../common/errors/bad-request.js'
import { sendResponse } from '../../common/response-json.js'
import { ICountryController, TCountry, TSortBy, TSortOrder } from './interface.js'

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
        } else {
          // if no filter is provided, we will send entire response
          filteredCountries.push(country)
        }
      }

      //After fetching all records, we will sort the order and apply pagination
      // sortBy=population/area, sortOrder=asc/desc
      const sortBy = req.query.sortBy as TSortBy || 'population'
      const orderBy = req.query.orderBy as TSortOrder || 'asc'
      const PAGE_SIZE = +(req.query.pageSize as string) || 10
      const PAGE_NUMBER = +(req.query.pageNumber as string) || 1

      this.sortCoutries(filteredCountries, sortBy, orderBy)
      const paginatedCountries = this.skipAndLimit(filteredCountries, PAGE_NUMBER, PAGE_SIZE)

      sendResponse(res, 200, 'All Countries fetched', {
        countries: paginatedCountries.array,
        currentPage: paginatedCountries.currentPage,
        totalPages: paginatedCountries.totalPages,
        totalItems: paginatedCountries.totalItems
      })
    } catch (error) {
      next(error)
    }
  }

  getCountryByName: Handler = async (req, res, next) => {
    try {
      const { country } = req.params

      const response = await fetch(`${BASE_URL}/name/${country.toLowerCase()}?fullText=true`, { method: 'GET' })

      const countryDetails: TCountry[] = await response.json()

      sendResponse(res, 200, 'Country Details fetched!', countryDetails)
    } catch (error) {
      next(error)
    }
  }

  private skipAndLimit<T>(array: T[], pageNumber: number, limit: number) {
    const totalItems = array.length
    const totalPages = Math.ceil(totalItems / limit)
    const skip = (pageNumber - 1) * limit

    if (skip >= array.length) {
      throw new BadRequestException('No country found!')
    }

    return {
      array: array.splice(skip, limit),
      currentPage: pageNumber,
      totalPages,
      totalItems
    }
  }

  private sortCoutries(array: TCountry[], sortBy: TSortBy, sortOrder: TSortOrder) {
    for (let i = 0; i < array.length; ++i) {
      for (let j = i + 1; j < array.length; ++j) {
        if (sortOrder === 'asc') {
          if (array[i][sortBy] > array[j][sortBy]) {
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
        } else {
          if (array[i][sortBy] < array[j][sortBy]) {
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
        }
      }
    }
  }
}
