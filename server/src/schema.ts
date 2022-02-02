import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { context } from './context'
import {
  CollectionItemArgs,
  MutationAddCollectionArgs,
  MutationAddItemArgs,
  MutationDeleteCollectionArgs,
  MutationDeleteItemArgs,
  MutationLoginArgs,
  MutationSignupArgs,
  MutationUpdateCollectionArgs,
  MutationUpdateItemArgs,
  OrderingFieldItem,
  OrderingInput,
  QueryBareCollectionArgs,
  QuerySearchArgs,
  SearchInput,
  UserCollectionArgs,
} from './graphql'
import { compareSync, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Collection, User } from '@prisma/client'
import { JWT_SECRET } from './server'

const typeDefs = loadSchemaSync('../schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const getCollection = (id: number) =>
  context.prisma.collection.findFirst({ where: { id, userId: context.userId } })

const getItem = (id: number) =>
  context.prisma.item.findFirst({
    where: { id, collection: { userId: context.userId } },
  })

const getItems = async (
  { page, numberPerPage, ordering, orderingFieldItem }: OrderingInput,
  { collectionId, text, quantity, barcode }: SearchInput,
) => {
  const skip = (page - 1) * numberPerPage

  const baseQuery = {
    where: {
      collection: { userId: context.userId },
      collectionId: collectionId || undefined,
      OR: text
        ? [{ name: { contains: text } }, { description: { contains: text } }]
        : undefined,
      quantity: quantity
        ? { [quantity.comparison]: quantity.value }
        : undefined,
      barcode,
    },
  }

  const items = context.prisma.item.findMany({
    ...baseQuery,
    orderBy: [
      { [orderingFieldItem || OrderingFieldItem.Id]: ordering || 'desc' },
    ],
    skip,
    take: numberPerPage,
  })

  const count = await context.prisma.item.count(baseQuery)

  return { pages: Math.ceil(count / numberPerPage), items }
}

const resolvers = {
  Query: {
    me: () => context.prisma.user.findUnique({ where: { id: context.userId } }),
    search: (_: undefined, { ordering, input }: QuerySearchArgs) =>
      getItems(ordering, input),
    bareCollection: (_: undefined, { collectionId }: QueryBareCollectionArgs) =>
      context.prisma.item.findMany({
        where: {
          collection: { userId: context.userId },
          collectionId: collectionId,
        },
      }),
  },

  Mutation: {
    signup: async (_: undefined, { pseudo, password }: MutationSignupArgs) => {
      if (!pseudo || !password) throw 'SignupException'
      const hashedPass = await hash(password, 10)
      const user = await context.prisma.user.create({
        data: {
          pseudo,
          password: hashedPass,
        },
      })
      const token = sign({ userId: user.id }, JWT_SECRET)
      return { token, user }
    },
    login: async (_: undefined, { pseudo, password }: MutationLoginArgs) => {
      const user = await context.prisma.user.findUnique({ where: { pseudo } })
      if (!user) throw 'LoginException'
      const isEqual = compareSync(password, user.password)
      if (!isEqual) throw 'LoginException'
      const token = sign({ userId: user.id }, JWT_SECRET)
      return { token, user }
    },

    addCollection: (_: undefined, { input }: MutationAddCollectionArgs) =>
      context.userId && input.name !== ''
        ? context.prisma.collection.create({
            data: { ...input, userId: context.userId },
          })
        : null,
    updateCollection: async (
      _: undefined,
      { id, input }: MutationUpdateCollectionArgs,
    ) => {
      const collection = await getCollection(id)
      return context.prisma.collection.update({
        where: { id: collection?.id },
        data: { ...input },
      })
    },
    deleteCollection: async (
      _: undefined,
      { id }: MutationDeleteCollectionArgs,
    ) => {
      const collection = await getCollection(id)
      return context.prisma.collection.delete({ where: { id: collection?.id } })
    },

    addItem: async (
      _: undefined,
      { collectionId, input }: MutationAddItemArgs,
    ) => {
      const collection = await getCollection(collectionId)
      if (!collection?.id || input.name === '') return null
      return context.prisma.item.create({ data: { collectionId, ...input } })
    },
    updateItem: async (_: undefined, { id, input }: MutationUpdateItemArgs) => {
      const item = await getItem(id)
      return context.prisma.item.update({
        where: { id: item?.id },
        data: { ...input },
      })
    },
    deleteItem: async (_: undefined, { id }: MutationDeleteItemArgs) => {
      const item = await getItem(id)
      return context.prisma.item.delete({ where: { id: item?.id } })
    },
  },

  User: {
    collections: (parent: User) =>
      context.prisma.user
        .findUnique({ where: { id: parent.id } })
        .collections({ orderBy: [{ id: 'desc' }] }),
    collection: (parent: User, { id }: UserCollectionArgs) =>
      context.prisma.collection.findFirst({ where: { id, userId: parent.id } }),
  },

  Collection: {
    item: (parent: Collection, { id }: CollectionItemArgs) =>
      context.prisma.item.findFirst({ where: { id, collectionId: parent.id } }),
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
