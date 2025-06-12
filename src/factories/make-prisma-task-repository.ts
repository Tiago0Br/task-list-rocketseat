import { prisma } from '@/lib/prisma'
import { PrismaTaskRepository } from '@/repositories/prisma/prisma-task-repository'

export function makePrismaTaskRepository() {
  return new PrismaTaskRepository(prisma)
}
