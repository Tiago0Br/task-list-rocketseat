import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { userSchema } from '@/schemas/user-schema'
import { makePrismaUserRepository } from '@/factories/make-prisma-user-repository'

export async function login(req: Request, res: Response) {
  const { email, password } = userSchema.login.parse(req.body)

  const userRepository = makePrismaUserRepository()
  const { id } = await userRepository.verifyPassword(email, password)

  const token = jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.status(200).json({ token })
}
