import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Validation error',
      issues: error.issues.map((issue) => issue.message)
    })
  } else {
    response.status(500).json({
      message: 'Internal server error'
    })
  }

  next()
}
