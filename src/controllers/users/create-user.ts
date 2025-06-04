import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'
import { userSchema } from '@/schemas/user-schema'

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = userSchema.register.parse(req.body)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10)
    }
  })

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email
  })
}
