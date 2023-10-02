import { z } from 'zod';
import { ZodValidationError } from './zod-validation.js';

export abstract class CustomError extends Error {
  abstract statusCode: number
  abstract serializeErrors(): { message: string; fields?: string | number[] }[]

  constructor(message: string) {
    super(message)
    // Because we're extending built-in class, otherwise it will not work properly
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

export abstract class ZodCustomError {
  protected catchErr<T>(args: () => T) {
    try {
      return args()
    } catch (error) {
      throw new ZodValidationError(error as z.ZodError)
    }
  }
}
