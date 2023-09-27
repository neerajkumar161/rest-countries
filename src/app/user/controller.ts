import { Handler } from 'express'
import { sendResponse } from '../../common/response-json.js'
import { readFileFromDB, writeFileToDB } from '../../utils/file-system.js'
import { Password } from '../../utils/password.js'
import { IUser, IUserController } from './interface.js'

const DB_DIR = process.env.DB_DIR

const USER_DB_PATH = `${DB_DIR}/users.json`

// use IUserController interface before adding any controller here
export class UserController implements IUserController {
  signinUser: Handler = async (req, res, next) => {
    const { username, password } = req.body
    const fileContent = await readFileFromDB(USER_DB_PATH)
    if (!fileContent) {
      // In case when no file and user created!
      return sendResponse(res, 400, 'No user exists!')
    }

    const users = JSON.parse(fileContent) as IUser[]

    const userIdx = users.findIndex((el) => el.username === username)
    if (userIdx == -1) {
      return sendResponse(res, 400, 'No user exists!')
    }

    const isMatch = await Password.compare(users[userIdx].password, password)
    if (!isMatch) {
      return sendResponse(res, 400, 'Invalid Credentials!')
    }

    sendResponse(res, 200, 'User signed in succesfully!', { username, token: '234567890' })
  }

  signupUser: Handler = async (req, res, next) => {
    // Signup user
    const { username, password } = req.body

    const user = { username, password: await Password.toHash(password) }

    const fileContent = await readFileFromDB(USER_DB_PATH)

    // If not found, we will write a new file and add the username and password
    if (!fileContent) {
      await writeFileToDB(USER_DB_PATH, JSON.stringify([user]))
      sendResponse(res, 201, 'User registered!')
      return
    }

    const allUsers = JSON.parse(fileContent) as IUser[]
    const userIdx = allUsers.findIndex((el) => el.username === username)
    if (userIdx > -1) {
      sendResponse(res, 400, 'Username already exists! Try another one!')
      return
    }

    allUsers.push(user)
    await writeFileToDB(USER_DB_PATH, JSON.stringify(allUsers))
    sendResponse(res, 200, 'User registered!')
  }
}
