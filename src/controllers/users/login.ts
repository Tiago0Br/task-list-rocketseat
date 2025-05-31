import type { Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export async function login(req: Request, res: Response) {
  const loginSchema = z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
      })
      .email('Email must be a valid email'),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
  })

  const { email, password } = loginSchema.parse(req.body)

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    res.status(401).json({ message: 'Invalid Credentials' })
    return
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid Credentials' })
    return
  }

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.status(200).json({ token })
}
