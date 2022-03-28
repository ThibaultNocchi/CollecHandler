import { resolvers, typeDefs } from './schema'
import { verify } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

export const JWT_SECRET = process.env.JWT_SECRET || uuidv4()

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface Context {
  prisma: PrismaClient
  userId?: number
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): Context => {
    const token = req.headers.authorization
    let userId = undefined
    if (token) {
      try {
        const payload = verify(token, JWT_SECRET)
        // @ts-expect-error userId doesn't exist on type
        userId = payload.userId
      } catch {}
    }
    return { prisma, userId }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
