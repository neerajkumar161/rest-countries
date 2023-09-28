import { Handler } from 'express'
import { IUser } from '../../app/user/interface.js'
import { readFileFromDB } from '../../utils/file-system.js'
import { AuthToken } from '../auth-token.js'
import { BadRequestException } from '../errors/bad-request.js'
import { NotAuthorizedException } from '../errors/not-authorized.js'

const DB_DIR = process.env.DB_DIR
const USER_DB_PATH = `${DB_DIR}/users.json`

export const checkAuth: Handler = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      throw new BadRequestException('Auth token is required!')
    }

    const { username } = AuthToken.verify(token)
    const fileContent = await readFileFromDB(USER_DB_PATH)
    if (!fileContent) {
      // In case when no file and user created!
      throw new BadRequestException('No user exists!')
    }

    const users = JSON.parse(fileContent) as IUser[]

    const userIdx = users.findIndex((el) => el.username === username)
    if (userIdx == -1) {
      throw new NotAuthorizedException()
    }

    next()
  } catch (error) {
    next(error)
  }
}
