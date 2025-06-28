import bcrypt from 'bcrypt'

import { InvalidCredentialsError } from '@/errors'
import { Prisma, PrismaClient } from '@/generated/prisma'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ name, email, password }: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
  }

  async verifyPassword(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return {
      id: user.id
    }
  }
}
