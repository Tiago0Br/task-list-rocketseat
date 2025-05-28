import type { Request, Response } from 'express'

import { prisma } from '@/lib/prisma'

export async function getAllTasks(_: Request, res: Response) {
  const task = await prisma.task.findMany()

  res.status(200).json(task)
}
