import type { Request, Response } from 'express'

import { TaskNotFoundError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { taskSchema } from '@/schemas/task-schema'

export async function updateTask(req: Request, res: Response) {
  const { id, title, description } = taskSchema.update.parse({
    ...req.params,
    ...req.body
  })

  const task = await prisma.task.findUnique({
    where: {
      id,
      userId: req.user!.id
    }
  })

  if (!task) {
    throw TaskNotFoundError.byId(id)
  }

  const updatedTask = await prisma.task.update({
    where: {
      id
    },
    data: {
      title,
      description
    }
  })

  res.status(200).json(updatedTask)
}
