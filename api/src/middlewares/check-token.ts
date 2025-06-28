import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { UnauthorizedError } from '@/errors'

export function checkToken(request: Request, _: Response, next: NextFunction) {
  const token = request.headers.authorization

  if (!token) {
    throw new UnauthorizedError()
  }

  try {
    const { id } = jwt.verify(token, env.JWT_SECRET) as { id: string }

    request.user = {
      id
    }
  } catch (error) {
    throw new UnauthorizedError()
  }

  next()
}
