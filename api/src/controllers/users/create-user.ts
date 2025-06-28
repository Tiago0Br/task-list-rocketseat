import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { makePrismaUserRepository } from '@/factories/make-prisma-user-repository'
import { userSchema } from '@/schemas/user-schema'

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = userSchema.register.parse(req.body)

  const userRepository = makePrismaUserRepository()
  const user = await userRepository.create({
    name,
    email,
    password: await bcrypt.hash(password, 10)
  })

  res.status(201).json({ user })
}
