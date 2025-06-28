import type { Request, Response } from 'express'

import { taskSchema } from '@/schemas/task-schema'
import { makePrismaTaskRepository } from '@/factories/make-prisma-task-repository'

export async function createTask(req: Request, res: Response) {
  const { title, description } = taskSchema.create.parse(req.body)
  const taskRepository = makePrismaTaskRepository()
  const task = await taskRepository.create({
    title,
    description,
    userId: req.user!.id
  })

  res.status(201).json(task)
}
