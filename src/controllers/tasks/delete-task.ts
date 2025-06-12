import type { Request, Response } from 'express'

import { taskSchema } from '@/schemas/task-schema'
import { makePrismaTaskRepository } from '@/factories/make-prisma-task-repository'

export async function deleteTask(req: Request, res: Response) {
  const { id } = taskSchema.getById.parse(req.params)
  const userId = req.user!.id

  const taskRepository = makePrismaTaskRepository()

  await taskRepository.getById(userId, id)
  await taskRepository.delete(id)

  res.status(204).end()
}
