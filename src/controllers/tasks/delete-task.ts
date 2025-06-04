import type { Request, Response } from 'express'

import { TaskNotFoundError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { taskSchema } from '@/schemas/task-schema'

export async function deleteTask(req: Request, res: Response) {
  const { id } = taskSchema.getById.parse(req.params)

  const task = await prisma.task.findUnique({
    where: {
      id
    }
  })

  if (!task) {
    throw TaskNotFoundError.byId(id)
  }

  await prisma.task.delete({
    where: {
      id,
      userId: req.user!.id
    }
  })

  res.status(204).end()
}
