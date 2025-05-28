import type { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function updateTask(req: Request, res: Response) {
  const updateTaskByIdSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
        invalid_type_error: 'Id must be a string'
      })
      .uuid('Id must be a valid uuid'),
    title: z
      .string({
        invalid_type_error: 'Title must be a string'
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string'
      })
      .optional()
  })

  const { id, title, description } = updateTaskByIdSchema.parse({
    ...req.params,
    ...req.body
  })

  const task = await prisma.task.findUnique({
    where: {
      id
    }
  })

  if (!task) {
    res.status(400).json({ message: 'Task not found' })
    return
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
