import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/env'

export function checkToken(
  _: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.split(' ')[1]

  if (!token) {
    response.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    jwt.verify(token, env.JWT_SECRET)
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized' })
    return
  }

  next()
}
