import { Request, Response, NextFunction } from 'express'
import { checkToken } from '../utils/token-operations'

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) {
      res.status(401).json({ error: 'Token not provided' })
      return
    }

    const token = authorizationHeader.split(' ')[1]

    let user_id: string | undefined

    if (req.params.user_id) {
      user_id = req.params.user_id
    } else if (req.body.user_id) {
      user_id = req.body.user_id
    } else {
      res.status(401).json({ error: 'User ID not provided' })
      return
    }

    const isTokenValid = checkToken(token, user_id as string)

    if (!isTokenValid) {
      res.status(401).json({ error: 'Invalid token or user ID' })
      return
    }

    // Token and user ID are valid, proceed to the next middleware or route handler
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized Access' })
  }
}

export { validateTokenMiddleware }