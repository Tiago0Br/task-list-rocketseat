import { prisma } from '../lib/prisma'
import { Router } from 'express'
import { z } from 'zod'

const taskRouter = Router()

taskRouter.post('/', async (req, res) => {
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
})

taskRouter.get('/', async (_, res) => {
  const task = await prisma.task.findMany()

  res.status(200).json(task)
})

taskRouter.get('/:id', async (req, res) => {
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
})

taskRouter.put('/:id', async (req, res) => {
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
})

taskRouter.delete('/:id', async (req, res) => {
  const deleteTaskByIdSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
        invalid_type_error: 'Id must be a string'
      })
      .uuid('Id must be a valid uuid')
  })

  const { id } = deleteTaskByIdSchema.parse(req.params)

  const task = await prisma.task.findUnique({
    where: {
      id
    }
  })

  if (!task) {
    res.status(400).json({ message: 'Task not found' })
    return
  }

  await prisma.task.delete({
    where: {
      id
    }
  })

  res.status(204).end()
})

taskRouter.patch('/:id/complete', async (req, res) => {
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

  await prisma.task.update({
    where: {
      id
    },
    data: {
      completedAt: new Date()
    }
  })

  res.status(200).json({ message: 'Task completed' })
})

taskRouter.patch('/:id/uncomplete', async (req, res) => {
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

  await prisma.task.update({
    where: {
      id
    },
    data: {
      completedAt: {
        set: null
      }
    }
  })

  res.status(200).json({ message: 'Task uncompleted' })
})

export { taskRouter }
