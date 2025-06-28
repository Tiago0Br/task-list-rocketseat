import express from 'express'

import { env } from './env'
import { errorHandler } from './middlewares/error-handler'
import { checkToken } from './middlewares/check-token'
import { taskRouter } from './routes/task'
import { userRouter } from './routes/users'

const app = express()

app.use(express.json())

app.use('/docs', express.static('docs'))
app.get('/', (_, response) => {
  response.json({ message: 'API is running' })
})

app.use('/', userRouter)

app.use(checkToken)
app.use('/tasks', taskRouter)

app.use(errorHandler)

app.listen(env.PORT, () => console.log('Server is running on port 3333'))
