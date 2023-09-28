import { CustomError } from './custom-error.js'

export class BadRequestException extends CustomError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.message = message
    this.statusCode = 400
    Object.setPrototypeOf(this, BadRequestException.prototype)
  }

  serializeErrors(): { message: string; fields?: string | number[] | undefined }[] {
    return [{ message: this.message }]
  }
}
