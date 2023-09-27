import { Handler } from 'express'

export interface IUserController {
  signupUser: Handler
  signinUser: Handler
}


export interface IUser {
 username: string
 password: string 
}