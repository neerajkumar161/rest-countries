export abstract class CustomError extends Error {
  abstract statusCode: number
  abstract serializeErrors(): { message: string; fields?: string | number[] }[]

  constructor(message: string) {
    super(message)
    // Because we're extending built-in class, otherwise it will not work properly
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
