import { Handler } from 'express'

export interface IUserController {
  signupUser: Handler
  signinUser: Handler
}
