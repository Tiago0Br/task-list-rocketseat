import type { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function getTaskById(req: Request, res: Response) {
  const getTaskByIdSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
        invalid_type_error: 'Id must be a string'
      })
      .uuid('Id must be a valid uuid')
  })

  const { id } = getTaskByIdSchema.parse(req.params)

  const task = await prisma.task.findUnique({
    where: {
      id
    }
  })

  if (!task) {
    res.status(400).json({ message: 'Task not found' })
    return
  }

  res.status(200).json(task)
}
