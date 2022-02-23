import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
};


export type CollectionItemArgs = {
  id: Scalars['Int'];
};

export type CollectionInput = {
  name: Scalars['String'];
};

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
  getCollections: CollectionsList;
  me?: Maybe<User>;
  search: ItemsList;
};


export type QueryBareCollectionArgs = {
  collectionId: Scalars['Int'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', pseudo: string, collections: Array<{ __typename?: 'Collection', id: number, name: string }> } | null };

export type GetCollectionsQueryVariables = Exact<{
  ordering: OrderingInput;
  input: GetCollectionsInput;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', getCollections: { __typename?: 'CollectionsList', pages: number, collections: Array<{ __typename?: 'Collection', id: number, name: string }> } };

export type GetCollectionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', me?: { __typename?: 'User', collection?: { __typename?: 'Collection', name: string } | null } | null };

export type AddCollectionMutationVariables = Exact<{
  input: CollectionInput;
}>;


export type AddCollectionMutation = { __typename?: 'Mutation', addCollection?: { __typename?: 'Collection', id: number } | null };

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection?: { __typename?: 'Collection', id: number } | null };

export type GetItemQueryVariables = Exact<{
  collectionId: Scalars['Int'];
  id: Scalars['Int'];
}>;


export type GetItemQuery = { __typename?: 'Query', me?: { __typename?: 'User', collection?: { __typename?: 'Collection', item?: { __typename?: 'Item', name: string, quantity: number, description?: string | null, barcode?: string | null } | null } | null } | null };

export type AddItemMutationVariables = Exact<{
  collectionId: Scalars['Int'];
  input: ItemInput;
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem?: { __typename?: 'Item', id: number } | null };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem?: { __typename?: 'Item', id: number } | null };

export type LoginMutationVariables = Exact<{
  pseudo: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token: string } | null };

export type SignupMutationVariables = Exact<{
  pseudo: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'AuthPayload', token: string } | null };

export type SearchItemsQueryVariables = Exact<{
  ordering: OrderingInput;
  input: SearchInput;
}>;


export type SearchItemsQuery = { __typename?: 'Query', search: { __typename?: 'ItemsList', pages: number, items: Array<{ __typename?: 'Item', id: number, collectionId: number, name: string, quantity: number }> } };

export type BareCollectionQueryVariables = Exact<{
  collectionId: Scalars['Int'];
}>;


export type BareCollectionQuery = { __typename?: 'Query', bareCollection: Array<{ __typename?: 'Item', name: string, quantity: number, description?: string | null, barcode?: string | null }> };


export const MeDocument = gql`
    query me {
  me {
    pseudo
    collections {
      id
      name
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<never, MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const GetCollectionsDocument = gql`
    query getCollections($ordering: OrderingInput!, $input: GetCollectionsInput!) {
  getCollections(ordering: $ordering, input: $input) {
    pages
    collections {
      id
      name
    }
  }
}
    `;

export function useGetCollectionsQuery(options: Omit<Urql.UseQueryArgs<never, GetCollectionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCollectionsQuery>({ query: GetCollectionsDocument, ...options });
};
export const GetCollectionDocument = gql`
    query getCollection($id: Int!) {
  me {
    collection(id: $id) {
      name
    }
  }
}
    `;

export function useGetCollectionQuery(options: Omit<Urql.UseQueryArgs<never, GetCollectionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCollectionQuery>({ query: GetCollectionDocument, ...options });
};
export const AddCollectionDocument = gql`
    mutation addCollection($input: CollectionInput!) {
  addCollection(input: $input) {
    id
  }
}
    `;

export function useAddCollectionMutation() {
  return Urql.useMutation<AddCollectionMutation, AddCollectionMutationVariables>(AddCollectionDocument);
};
export const DeleteCollectionDocument = gql`
    mutation deleteCollection($id: Int!) {
  deleteCollection(id: $id) {
    id
  }
}
    `;

export function useDeleteCollectionMutation() {
  return Urql.useMutation<DeleteCollectionMutation, DeleteCollectionMutationVariables>(DeleteCollectionDocument);
};
export const GetItemDocument = gql`
    query getItem($collectionId: Int!, $id: Int!) {
  me {
    collection(id: $collectionId) {
      item(id: $id) {
        name
        quantity
        description
        barcode
      }
    }
  }
}
    `;

export function useGetItemQuery(options: Omit<Urql.UseQueryArgs<never, GetItemQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetItemQuery>({ query: GetItemDocument, ...options });
};
export const AddItemDocument = gql`
    mutation addItem($collectionId: Int!, $input: ItemInput!) {
  addItem(collectionId: $collectionId, input: $input) {
    id
  }
}
    `;

export function useAddItemMutation() {
  return Urql.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument);
};
export const DeleteItemDocument = gql`
    mutation deleteItem($id: Int!) {
  deleteItem(id: $id) {
    id
  }
}
    `;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
};
export const LoginDocument = gql`
    mutation login($pseudo: String!, $password: String!) {
  login(pseudo: $pseudo, password: $password) {
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignupDocument = gql`
    mutation signup($pseudo: String!, $password: String!) {
  signup(pseudo: $pseudo, password: $password) {
    token
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const SearchItemsDocument = gql`
    query searchItems($ordering: OrderingInput!, $input: SearchInput!) {
  search(ordering: $ordering, input: $input) {
    pages
    items {
      id
      collectionId
      name
      quantity
    }
  }
}
    `;

export function useSearchItemsQuery(options: Omit<Urql.UseQueryArgs<never, SearchItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchItemsQuery>({ query: SearchItemsDocument, ...options });
};
export const BareCollectionDocument = gql`
    query bareCollection($collectionId: Int!) {
  bareCollection(collectionId: $collectionId) {
    name
    quantity
    description
    barcode
  }
}
    `;

export function useBareCollectionQuery(options: Omit<Urql.UseQueryArgs<never, BareCollectionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BareCollectionQuery>({ query: BareCollectionDocument, ...options });
};