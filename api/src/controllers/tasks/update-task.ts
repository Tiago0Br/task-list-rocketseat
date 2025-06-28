import type { Request, Response } from 'express'

import { taskSchema } from '@/schemas/task-schema'
import { makePrismaTaskRepository } from '@/factories/make-prisma-task-repository'

export async function updateTask(req: Request, res: Response) {
  const { id, title, description } = taskSchema.update.parse({
    ...req.params,
    ...req.body
  })
  const userId = req.user!.id

  const taskRepository = makePrismaTaskRepository()

  await taskRepository.getById(userId, id)
  const updatedTask = await taskRepository.update(id, {
    title,
    description
  })

  res.status(200).json(updatedTask)
}
