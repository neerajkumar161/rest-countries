import { CustomError } from './custom-error.js';

export class NotAuthorizedException extends CustomError {
  statusCode: number
  constructor() {
    super('Not Authorized!')
    this.statusCode = 401
    Object.setPrototypeOf(this, NotAuthorizedException.prototype)
  }

  serializeErrors(): { message: string; fields?: string | number[] | undefined }[] {
    return [{ message: 'Not Authorized!' }]
  }
}
