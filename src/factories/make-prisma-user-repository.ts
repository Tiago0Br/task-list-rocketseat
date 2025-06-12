import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makePrismaUserRepository() {
  return new PrismaUserRepository(prisma)
}
