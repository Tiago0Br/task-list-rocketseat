import type { Request, Response } from 'express'

import { prisma } from '@/lib/prisma'

export async function getAllTasks(req: Request, res: Response) {
  const task = await prisma.task.findMany({
    where: {
      userId: req.user!.id
    }
  })

  res.status(200).json(task)
}
