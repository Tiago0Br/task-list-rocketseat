import { Prisma, PrismaClient, Task } from '@/generated/prisma'
import { TaskRepository } from '../task-repository'
import { TaskNotFoundError } from '@/errors'

export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}
  create(task: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data: task,
      select: {
        id: true,
        title: true,
        description: true,
        completedAt: true
      }
    })
  }
  getAll() {
    return this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        completedAt: true
      }
    })
  }
  async getById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        title: true,
        description: true,
        completedAt: true
      }
    })

    if (!task) {
      throw TaskNotFoundError.byId(id)
    }

    return task
  }
  update(id: string, task: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where: {
        id
      },
      data: task,
      select: {
        id: true,
        title: true,
        description: true,
        completedAt: true
      }
    })
  }
  async delete(id: string) {
    await this.prisma.task.delete({
      where: {
        id
      }
    })
  }
  complete(id: string) {
    return this.prisma.task.update({
      where: {
        id
      },
      data: {
        completedAt: new Date()
      },
      select: {
        id: true,
        title: true,
        description: true,
        completedAt: true
      }
    })
  }
  uncomplete(id: string) {
    return this.prisma.task.update({
      where: {
        id
      },
      data: {
        completedAt: {
          set: null
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        completedAt: true
      }
    })
  }
}
