import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { InvalidCredentialsError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import { userSchema } from '@/schemas/user-schema'

export async function login(req: Request, res: Response) {
  const { email, password } = userSchema.login.parse(req.body)

  const user = await prisma.user.findUnique({
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

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.status(200).json({ token })
}
