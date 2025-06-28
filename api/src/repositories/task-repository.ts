import { Prisma, Task } from '@/generated/prisma'

type TaskOutput = Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>
export type CreateTaskInput = Pick<Prisma.TaskCreateInput, 'title' | 'description'> & {
  userId: string
}

export interface TaskRepository {
  create: (task: CreateTaskInput) => Promise<TaskOutput>
  getAllByUserId: (userId: string) => Promise<TaskOutput[]>
  getById: (userId: string, id: string) => Promise<TaskOutput>
  update: (id: string, task: Prisma.TaskUpdateInput) => Promise<TaskOutput>
  delete: (id: string) => Promise<void>
  complete: (id: string) => Promise<TaskOutput>
  uncomplete: (id: string) => Promise<TaskOutput>
}
