import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_, response) => {
  response.json({ message: 'Hello World' })
})

app.listen(3333, () => console.log('Server is running'))
