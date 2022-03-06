export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['Int'];
  item?: Maybe<Item>;
  name: Scalars['String'];
  type?: Maybe<CollectionType>;
};


export type CollectionItemArgs = {
  id: Scalars['Int'];
};

export type CollectionInput = {
  name: Scalars['String'];
  type?: InputMaybe<CollectionType>;
};

export enum CollectionType {
  Books = 'books'
}

export type CollectionsList = {
  __typename?: 'CollectionsList';
  collections: Array<Collection>;
  pages: Scalars['Int'];
};

export enum Comparisons {
  Equals = 'equals',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte'
}

export type FetchFromIsbnPayload = {
  __typename?: 'FetchFromIsbnPayload';
  isbn: Scalars['String'];
  name: Scalars['String'];
};

export type GetCollectionsInput = {
  text?: InputMaybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  barcode?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type ItemInput = {
  barcode?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type ItemsList = {
  __typename?: 'ItemsList';
  items: Array<Item>;
  pages: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCollection?: Maybe<Collection>;
  addItem?: Maybe<Item>;
  deleteCollection?: Maybe<Collection>;
  deleteItem?: Maybe<Item>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  updateCollection?: Maybe<Collection>;
  updateItem?: Maybe<Item>;
};


export type MutationAddCollectionArgs = {
  input: CollectionInput;
};


export type MutationAddItemArgs = {
  collectionId: Scalars['Int'];
  input: ItemInput;
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  pseudo: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  pseudo: Scalars['String'];
};


export type MutationUpdateCollectionArgs = {
  id: Scalars['Int'];
  input: CollectionInput;
};


export type MutationUpdateItemArgs = {
  id: Scalars['Int'];
  input: ItemInput;
};

export enum Ordering {
  Asc = 'asc',
  Desc = 'desc'
}

export enum OrderingFieldCollection {
  Id = 'id',
  Name = 'name'
}

export enum OrderingFieldItem {
  Id = 'id',
  Name = 'name',
  Quantity = 'quantity'
}

export type OrderingInput = {
  numberPerPage: Scalars['Int'];
  ordering?: InputMaybe<Ordering>;
  orderingFieldCollection?: InputMaybe<OrderingFieldCollection>;
  orderingFieldItem?: InputMaybe<OrderingFieldItem>;
  page: Scalars['Int'];
};

export type QuantitySearchInput = {
  comparison: Comparisons;
  value: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  bareCollection: Array<Item>;
  fetchFromIsbn?: Maybe<FetchFromIsbnPayload>;
  getCollections: CollectionsList;
  me?: Maybe<User>;
  search: ItemsList;
};


export type QueryBareCollectionArgs = {
  collectionId: Scalars['Int'];
};


export type QueryFetchFromIsbnArgs = {
  isbn: Scalars['String'];
};


export type QueryGetCollectionsArgs = {
  input: GetCollectionsInput;
  ordering: OrderingInput;
};


export type QuerySearchArgs = {
  input: SearchInput;
  ordering: OrderingInput;
};

export type SearchInput = {
  barcode?: InputMaybe<Scalars['String']>;
  collectionId?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<QuantitySearchInput>;
  text?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  pseudo: Scalars['String'];
};


export type UserCollectionArgs = {
  id: Scalars['Int'];
};
