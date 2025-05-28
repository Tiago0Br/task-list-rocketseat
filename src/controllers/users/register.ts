import type { Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'

export async function register(req: Request, res: Response) {
  const registerSchema = z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string'
      })
      .min(3, 'Name must be at least 3 characters'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
      })
      .email('Email must be a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
      })
      .min(6, 'Password must be at least 6 characters')
  })

  const { name, email, password } = registerSchema.parse(req.body)

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
