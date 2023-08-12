import { sign, verify } from 'jsonwebtoken'
import { User } from '../types/UserType'

const tokenSecret = process.env.TOKEN_SECRET as string

const generateToken = (user: User): string => {
  return sign(user, tokenSecret as string)
}

const checkToken = (token: string): string => {
  return verify(token, tokenSecret as string) as string
}

export { generateToken, checkToken }