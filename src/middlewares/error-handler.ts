import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { DomainError, UnauthorizedError } from '@/errors'

export function errorHandler(
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Validation error',
      issues: error.issues.map((issue) => issue.message)
    })
  } else if (error instanceof DomainError) {
    response.status(400).json({
      message: error.message
    })
  } else if (error instanceof UnauthorizedError) {
    response.status(401).json({
      message: error.message
    })
  } else {
    response.status(500).json({
      message: 'Internal server error'
    })
  }

  next()
}
