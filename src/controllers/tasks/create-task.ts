import type { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function createTask(req: Request, res: Response) {
  const createTaskSchema = z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
  })

  const { title, description } = createTaskSchema.parse(req.body)
  const task = await prisma.task.create({
    data: {
      title,
      description
    }
  })

  res.status(201).json(task)
}
