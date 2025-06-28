import { Router } from 'express'

import { createUser } from '@/controllers/users/create-user'
import { login } from '@/controllers/users/login'

const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/users', createUser)

export { userRouter }
