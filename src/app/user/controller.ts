import { Handler } from 'express'
import { AuthToken } from '../../common/auth-token.js'
import { BadRequestException } from '../../common/errors/bad-request.js'
import { sendResponse } from '../../common/response-json.js'
import { readFileFromDB, writeFileToDB } from '../../utils/file-system.js'
import { Password } from '../../utils/password.js'
import { IUser, IUserController } from './interface.js'

const DB_DIR = process.env.DB_DIR
const USER_DB_PATH = `${DB_DIR}/users.json`

export class UserController implements IUserController {
  signinUser: Handler = async (req, res, next) => {
    try {

      const { username, password } = req.body
      const fileContent = await readFileFromDB(USER_DB_PATH)
      if (!fileContent) {
        // In case when no file and user created!
        throw new BadRequestException('No users exists!')
      }

      const users = JSON.parse(fileContent) as IUser[]
      const userIdx = users.findIndex((el) => el.username === username)
      if (userIdx == -1) {
        throw new BadRequestException('No users exists!')
      }

      const isMatch = await Password.compare(users[userIdx].password, password)
      if (!isMatch) {
        throw new BadRequestException('Invalid credentials!')
      }

      const authToken = AuthToken.get({ username })

      sendResponse(res, 200, 'User signed in succesfully!', { username, token: authToken })
    } catch (error) {
      next(error)
    }
  }

  signupUser: Handler = async (req, res, next) => {
    try {
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
        throw new BadRequestException('Username already exists! Try another one!')
      }

      allUsers.push(user)
      await writeFileToDB(USER_DB_PATH, JSON.stringify(allUsers))
      sendResponse(res, 200, 'User registered!')
    } catch (error) {
      next(error)
    }
  }
}
