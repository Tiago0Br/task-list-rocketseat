import express from 'express'

import { taskRouter } from './routes/task'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(express.json())

app.get('/', (_, response) => {
  response.json({ message: 'API is running' })
})

app.use('/tasks', taskRouter)
app.use(errorHandler)

app.listen(3333, () => console.log('Server is running on port 3333'))
