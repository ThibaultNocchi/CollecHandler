import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import {
  CollectionItemArgs,
  CollectionType,
  Errors,
  FetchFromIsbnPayload,
  GetCollectionsInput,
  MutationAddCollectionArgs,
  MutationAddItemArgs,
  MutationDeleteCollectionArgs,
  MutationDeleteItemArgs,
  MutationLoginArgs,
  MutationSignupArgs,
  MutationUpdateCollectionArgs,
  MutationUpdateItemArgs,
  Ordering,
  OrderingFieldCollection,
  OrderingFieldItem,
  OrderingInput,
  QueryBareCollectionArgs,
  QueryFetchFromIsbnArgs,
  QueryGetCollectionsArgs,
  QuerySearchArgs,
  SearchInput,
  UserCollectionArgs,
} from './graphql'
import { compareSync, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Collection, User } from '@prisma/client'
import { Context, JWT_SECRET } from './server'
import nodeisbn from 'node-isbn'

const typeDefs = loadSchemaSync('../schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const authGuard = (ctx: Context) => {
  if (!ctx.userId) throw new Error(Errors.Unauthorized)
}

const pageCount = (total: number, take?: number) =>
  take ? Math.ceil(total / take) : 1

const getCollection = (id: number, ctx: Context) =>
  ctx.prisma.collection.findFirst({ where: { id, userId: ctx.userId } })

const getCollections = async (
  { page, numberPerPage, ordering, orderingFieldCollection }: OrderingInput,
  { text }: GetCollectionsInput,
  ctx: Context,
) => {
  let skip: number | undefined = (page - 1) * numberPerPage
  let take: number | undefined = numberPerPage
  if (numberPerPage == -1) {
    skip = undefined
    take = undefined
  }

  const baseQuery = {
    where: {
      userId: ctx.userId,
      name: text ? { contains: text } : undefined,
    },
  }

  const collections = ctx.prisma.collection.findMany({
    ...baseQuery,
    orderBy: [
      {
        [orderingFieldCollection || OrderingFieldCollection.Id]:
          ordering || Ordering.Desc,
      },
    ],
    skip,
    take,
  })

  const count = await ctx.prisma.collection.count(baseQuery)
  return { pages: pageCount(count, take), collections }
}

const getItem = (id: number, ctx: Context) =>
  ctx.prisma.item.findFirst({
    where: { id, collection: { userId: ctx.userId } },
  })

const getItems = async (
  { page, numberPerPage, ordering, orderingFieldItem }: OrderingInput,
  { collectionId, text, quantity, barcode }: SearchInput,
  ctx: Context,
) => {
  const skip = (page - 1) * numberPerPage

  const baseQuery = {
    where: {
      collection: { userId: ctx.userId },
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

  const items = ctx.prisma.item.findMany({
    ...baseQuery,
    orderBy: [
      {
        [orderingFieldItem || OrderingFieldItem.Id]: ordering || Ordering.Desc,
      },
    ],
    skip,
    take: numberPerPage,
  })

  const count = await ctx.prisma.item.count(baseQuery)

  return { pages: Math.ceil(count / numberPerPage), items }
}

const resolvers = {
  Query: {
    me: (_: undefined, __: undefined, ctx: Context) => {
      authGuard(ctx)
      return ctx.prisma.user.findUnique({ where: { id: ctx.userId } })
    },

    search: (
      _: undefined,
      { ordering, input }: QuerySearchArgs,
      ctx: Context,
    ) => {
      authGuard(ctx)
      return getItems(ordering, input, ctx)
    },

    getCollections: (
      _: undefined,
      args: QueryGetCollectionsArgs,
      ctx: Context,
    ) => {
      authGuard(ctx)
      return getCollections(args.ordering, args.input, ctx)
    },

    bareCollection: (
      _: undefined,
      { collectionId }: QueryBareCollectionArgs,
      ctx: Context,
    ) => {
      authGuard(ctx)

      return ctx.prisma.item.findMany({
        where: {
          collection: { userId: ctx.userId },
          collectionId: collectionId,
        },
      })
    },

    fetchFromIsbn: async (
      _: undefined,
      args: QueryFetchFromIsbnArgs,
      ctx: Context,
    ): Promise<FetchFromIsbnPayload | null> => {
      authGuard(ctx)
      try {
        const res = await nodeisbn.resolve(args.isbn)
        return { name: res.title, isbn: args.isbn }
      } catch {
        return null
      }
    },
  },

  Mutation: {
    signup: async (
      _: undefined,
      { pseudo, password }: MutationSignupArgs,
      ctx: Context,
    ) => {
      if (!pseudo || !password) throw new Error(Errors.Signup)

      const existingUser = await ctx.prisma.user.findUnique({
        where: { pseudo },
      })
      if (existingUser) throw new Error(Errors.SignupExistingpseudo)

      const hashedPass = await hash(password, 10)
      const user = await ctx.prisma.user.create({
        data: {
          pseudo,
          password: hashedPass,
        },
      })
      const token = sign({ userId: user.id }, JWT_SECRET)
      return { token, user }
    },

    login: async (
      _: undefined,
      { pseudo, password }: MutationLoginArgs,
      ctx: Context,
    ) => {
      const user = await ctx.prisma.user.findUnique({ where: { pseudo } })
      if (!user) throw new Error(Errors.Login)
      const isEqual = compareSync(password, user.password)
      if (!isEqual) throw new Error(Errors.Login)
      const token = sign({ userId: user.id }, JWT_SECRET)
      return { token, user }
    },

    addCollection: (
      _: undefined,
      { input }: MutationAddCollectionArgs,
      ctx: Context,
    ) => {
      if (
        ctx.userId &&
        input.name !== '' &&
        (!input.type || Object.values(CollectionType).includes(input.type))
      ) {
        return ctx.prisma.collection.create({
          data: { ...input, userId: ctx.userId },
        })
      } else {
        return null
      }
    },
    updateCollection: async (
      _: undefined,
      { id, input }: MutationUpdateCollectionArgs,
      ctx: Context,
    ) => {
      const collection = await getCollection(id, ctx)
      if (!input.type || Object.values(CollectionType).includes(input.type)) {
        return ctx.prisma.collection.update({
          where: { id: collection?.id },
          data: { ...input },
        })
      } else {
        return null
      }
    },
    deleteCollection: async (
      _: undefined,
      { id }: MutationDeleteCollectionArgs,
      ctx: Context,
    ) => {
      const collection = await getCollection(id, ctx)
      return ctx.prisma.collection.delete({ where: { id: collection?.id } })
    },

    addItem: async (
      _: undefined,
      { collectionId, input }: MutationAddItemArgs,
      ctx: Context,
    ) => {
      const collection = await getCollection(collectionId, ctx)
      if (!collection?.id || input.name === '') return null
      return ctx.prisma.item.create({ data: { collectionId, ...input } })
    },
    updateItem: async (
      _: undefined,
      { id, input }: MutationUpdateItemArgs,
      ctx: Context,
    ) => {
      const item = await getItem(id, ctx)
      return ctx.prisma.item.update({
        where: { id: item?.id },
        data: { ...input },
      })
    },
    deleteItem: async (
      _: undefined,
      { id }: MutationDeleteItemArgs,
      ctx: Context,
    ) => {
      const item = await getItem(id, ctx)
      return ctx.prisma.item.delete({ where: { id: item?.id } })
    },
  },

  User: {
    collections: (parent: User, _: undefined, ctx: Context) =>
      ctx.prisma.user
        .findUnique({ where: { id: parent.id } })
        .collections({ orderBy: [{ id: 'desc' }] }),

    collection: (parent: User, { id }: UserCollectionArgs, ctx: Context) =>
      ctx.prisma.collection.findFirst({ where: { id, userId: parent.id } }),
  },

  Collection: {
    item: (parent: Collection, { id }: CollectionItemArgs, ctx: Context) =>
      ctx.prisma.item.findFirst({ where: { id, collectionId: parent.id } }),
  },
}

export { typeDefs, resolvers }
