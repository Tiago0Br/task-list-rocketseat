import { UnauthorizedError } from './unauthorized-error'

export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Invalid credentials')
  }
}
