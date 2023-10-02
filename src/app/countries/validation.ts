import { z } from 'zod'
import { ZodCustomError } from '../../common/errors/custom-error.js'

export class CountryValidation extends ZodCustomError {
  countries(body: unknown) {
    const queryParams = z.object({
      population: z.string().optional(),
      area: z.string().optional(),
      language: z.string().optional(),
      sortBy: z.union([ z.literal('population'), z.literal('area')]).optional(),
      orderBy: z.union([ z.literal('asc'), z.literal('desc')]).optional(),
      pageSize: z.string().optional(),
      pageNumber: z.string().optional()
    })
    return this.catchErr(() => queryParams.parse(body))
  }

  countryByName(body: unknown) {
    const paramsBody = z.object({
      country: z.string().toLowerCase()
    })
    return this.catchErr(() => paramsBody.parse(body))
  }
}
