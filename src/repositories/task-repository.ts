import { Prisma, Task } from '@/generated/prisma'

type TaskOutput = Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>

export interface TaskRepository {
  create: (task: Prisma.TaskCreateInput) => Promise<TaskOutput>
  getAll: () => Promise<TaskOutput[]>
  getById: (id: string) => Promise<TaskOutput>
  update: (id: string, task: Prisma.TaskUpdateInput) => Promise<TaskOutput>
  delete: (id: string) => Promise<void>
  complete: (id: string) => Promise<TaskOutput>
  uncomplete: (id: string) => Promise<TaskOutput>
}
