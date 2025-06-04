import { DomainError } from './domain-error'

export class TaskNotFoundError extends DomainError {
  static byId(id: string) {
    return new this(`Task with id '${id}' not found`)
  }
}
