import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  userId?: number
}

export const context: Context = {
  prisma: prisma,
  userId: undefined,
}
