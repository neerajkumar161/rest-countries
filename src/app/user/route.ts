import { Router } from 'express'
import { UserController } from './controller.js'

export const userRouter = Router()

const { signinUser, signupUser } = new UserController()

userRouter.post('/signin', signinUser).post('/signup', signupUser)
