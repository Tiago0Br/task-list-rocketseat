import { Router } from 'express'

import { register } from '@/controllers/users/register'

const userRouter = Router()

userRouter.post('/register', register)

export { userRouter }
