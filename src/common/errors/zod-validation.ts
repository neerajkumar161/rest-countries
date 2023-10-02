import { z } from 'zod'

export class ZodValidationError {
  statusCode: number
  errors: z.ZodError
  message: string

  constructor(error: z.ZodError) {
    this.message = 'Validation error!'
    this.statusCode = 400
    this.errors = error
    Object.setPrototypeOf(this, ZodValidationError.prototype)
  }

  getErrors() {
    return [{ message: this.message, fields: this.errors.formErrors.fieldErrors }]
  }
}
