import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export enum Errors {
  Login = 'login',
  Signup = 'signup',
  SignupExistingpseudo = 'signup_existingpseudo',
  Unauthorized = 'unauthorized'
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
  total: Scalars['Int'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', pseudo: string } | null };

export type GetCollectionsQueryVariables = Exact<{
  ordering: OrderingInput;
  input: GetCollectionsInput;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', getCollections: { __typename?: 'CollectionsList', pages: number, collections: Array<{ __typename?: 'Collection', id: number, name: string, type?: CollectionType | null }> } };

export type GetCollectionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', me?: { __typename?: 'User', collection?: { __typename?: 'Collection', name: string, type?: CollectionType | null } | null } | null };

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

export type FetchFromIsbnQueryVariables = Exact<{
  isbn: Scalars['String'];
}>;


export type FetchFromIsbnQuery = { __typename?: 'Query', fetchFromIsbn?: { __typename?: 'FetchFromIsbnPayload', name: string, isbn: string } | null };

export type BareCollectionQueryVariables = Exact<{
  collectionId: Scalars['Int'];
}>;


export type BareCollectionQuery = { __typename?: 'Query', bareCollection: Array<{ __typename?: 'Item', name: string, quantity: number, description?: string | null, barcode?: string | null }> };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCollectionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCollections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
export const AddCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddCollectionMutation, AddCollectionMutationVariables>;
export const DeleteCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const GetItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barcode"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetItemQuery, GetItemQueryVariables>;
export const AddItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;
export const DeleteItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteItemMutation, DeleteItemMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pseudo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pseudo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const SearchItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<SearchItemsQuery, SearchItemsQueryVariables>;
export const FetchFromIsbnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchFromIsbn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isbn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchFromIsbn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isbn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isbn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isbn"}}]}}]}}]} as unknown as DocumentNode<FetchFromIsbnQuery, FetchFromIsbnQueryVariables>;
export const BareCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bareCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bareCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barcode"}}]}}]}}]} as unknown as DocumentNode<BareCollectionQuery, BareCollectionQueryVariables>;