import { Handler } from 'express'
import { IUserController } from './interface.js'

// use IUserController interface before adding any controller here
export class UserController implements IUserController {
  signinUser: Handler = (req, res, next) => {
    console.log('User SignIn Handler', req.body)
  }

  signupUser: Handler = (req, res, next) => {
    console.log(`User singup Handler`, req.body)
  }
}
