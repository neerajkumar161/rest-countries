import { randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'

const scryptSync = promisify(scrypt)

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex')
    const buffer = (await scryptSync(password, salt, 64)) as Buffer

    return `${buffer.toString('hex')}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.')

    const buffer = (await scryptSync(suppliedPassword, salt, 64)) as Buffer

    return buffer.toString('hex') === hashedPassword
  }
}