import type { Request, Response } from 'express'

import { taskSchema } from '@/schemas/task-schema'
import { prisma } from '@/lib/prisma'

export async function createTask(req: Request, res: Response) {
  const { title, description } = taskSchema.create.parse(req.body)
  const task = await prisma.task.create({
    data: {
      userId: req.user!.id,
      title,
      description
    }
  })

  res.status(201).json(task)
}
