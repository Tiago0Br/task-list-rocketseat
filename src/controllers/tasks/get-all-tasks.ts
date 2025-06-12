import type { Request, Response } from 'express'

import { makePrismaTaskRepository } from '@/factories/make-prisma-task-repository'

export async function getAllTasks(req: Request, res: Response) {
  const userId = req.user!.id
  const taskRepository = makePrismaTaskRepository()

  const task = await taskRepository.getAllByUserId(userId)

  res.status(200).json(task)
}
