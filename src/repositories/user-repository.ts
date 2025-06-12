import { Prisma, User } from '@/generated/prisma'

type UserData = Omit<User, 'password'>

export interface UserRepository {
  create: (user: Prisma.UserCreateInput) => Promise<UserData>
  verifyPassword: (email: string, password: string) => Promise<{ id: string } | null>
}
