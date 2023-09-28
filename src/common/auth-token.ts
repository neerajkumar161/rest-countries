import jwt, { Secret } from 'jsonwebtoken'
import { BadRequestException } from './errors/bad-request.js'

const JWT_SECRET_KEY = process.env.DB_DIR as Secret

type TJWTPayload = { username: string }

export class AuthToken {
  static get(payload: TJWTPayload) {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' })
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET_KEY) as TJWTPayload
    } catch (error) {
      throw new BadRequestException('Invalid auth token!')
    }
  }
}
