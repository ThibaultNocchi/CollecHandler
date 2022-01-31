import express, { NextFunction, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema'
import { context } from './context'
import { verify } from 'jsonwebtoken'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

export const JWT_SECRET = process.env.JWT_SECRET || uuidv4()

const app = express()

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const loggingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization
  if (token) {
    try {
      const payload = verify(token, JWT_SECRET)
      // @ts-expect-error userId doesn't exist on type
      context.userId = payload.userId
    } catch (err) {
      res.status(401).send()
      return
    }
  }
  next()
}

app.use(cors())
app.use(loggingMiddleware)
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context: context,
    graphiql: !process.env.NODE_ENV,
  }),
)

app.listen(4000)
console.log(`🚀 Server ready at: http://localhost:4000/graphql`)
