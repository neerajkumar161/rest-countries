import { z } from 'zod'
import { ZodCustomError } from '../../common/errors/custom-error.js'

export class UserValidation extends ZodCustomError {
  signin(body: unknown) {
    const bodySchema = z.object({
      username: z.string().min(5).toLowerCase(),
      password: z.string()
    })
    return this.catchErr(() => bodySchema.parse(body))
  }

  signup(body: unknown) {
    const bodySchema = z.object({
      username: z.string().min(5).toLowerCase(),
      password: z.string().min(5)
    })
    return this.catchErr(() => bodySchema.parse(body))
  }
}
