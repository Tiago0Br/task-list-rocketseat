import { prisma } from '../lib/prisma'
import { Router } from 'express'
import { z } from 'zod'

const taskRouter = Router()

taskRouter.post('/', async (req, res) => {
  const createTaskSchema = z.object({
    title: z.string(),
    description: z.string()
  })

  const { title, description } = createTaskSchema.parse(req.body)
  const task = await prisma.task.create({
    data: {
      title,
      description
    }
  })

  res.status(201).json(task)
})

export { taskRouter }
