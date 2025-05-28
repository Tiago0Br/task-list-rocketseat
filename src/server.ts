import express from 'express'

import { errorHandler } from './middlewares/error-handler'
import { taskRouter } from './routes/task'
import { userRouter } from './routes/users'

const app = express()

app.use(express.json())

app.get('/', (_, response) => {
  response.json({ message: 'API is running' })
})

app.use('/', userRouter)
app.use('/tasks', taskRouter)
app.use(errorHandler)

app.listen(3333, () => console.log('Server is running on port 3333'))
