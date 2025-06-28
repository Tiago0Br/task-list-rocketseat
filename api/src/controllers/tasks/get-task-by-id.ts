import type { Request, Response } from 'express'

import { taskSchema } from '@/schemas/task-schema'
import { makePrismaTaskRepository } from '@/factories/make-prisma-task-repository'

export async function getTaskById(req: Request, res: Response) {
  const { id } = taskSchema.getById.parse(req.params)
  const userId = req.user!.id

  const taskRepository = makePrismaTaskRepository()
  const task = await taskRepository.getById(userId, id)

  res.status(200).json(task)
}
