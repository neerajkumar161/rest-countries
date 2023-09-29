import { Handler } from 'express'

export interface ICountryController {
  getCountryByName: Handler
  getCountries: Handler
}

export type TCountry = {
  name: { common: string; official: string }
  currencies: Record<string, { name: string; symbol: string }>
  languages: Record<string, string>
  population: number
  area: number
}

export type TSortBy = Extract<keyof TCountry, 'area' | 'population'>
export type TSortOrder = 'asc' | 'desc'