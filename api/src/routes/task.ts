import { Router } from 'express'

import {
  completeTask,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  uncompleteTask,
  updateTask
} from '@/controllers/tasks'

const taskRouter = Router()

taskRouter.post('/', createTask)
taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', getTaskById)
taskRouter.put('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)
taskRouter.patch('/:id/complete', completeTask)
taskRouter.patch('/:id/uncomplete', uncompleteTask)

export { taskRouter }
