import { GraphQLResolveInfo } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
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

export enum PlanetType {
  GasGiant = 'GAS_GIANT',
  IceGiant = 'ICE_GIANT',
  Terrestrial = 'TERRESTRIAL',
  Dwarf = 'DWARF'
}

export type Planet = {
  __typename?: 'Planet';
  name: Scalars['String'];
  orbiting: Star;
  altitude: Scalars['Float'];
  type: PlanetType;
  satellites: Array<Satellite>;
};

export enum StarType {
  Giant = 'GIANT',
  MainSequence = 'MAIN_SEQUENCE',
  WhiteDwarf = 'WHITE_DWARF',
  RedDwarf = 'RED_DWARF'
}

export type Star = {
  __typename?: 'Star';
  name: Scalars['String'];
  type: StarType;
  planets: Array<Planet>;
};

export type Satellite = {
  __typename?: 'Satellite';
  orbiting: Planet;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  planets: Array<Planet>;
  stars: Array<Star>;
  satellites: Array<Satellite>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  PlanetType: ResolverTypeWrapper<Partial<PlanetType>>;
  Planet: ResolverTypeWrapper<Partial<Planet>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>;
  StarType: ResolverTypeWrapper<Partial<StarType>>;
  Star: ResolverTypeWrapper<Partial<Star>>;
  Satellite: ResolverTypeWrapper<Partial<Satellite>>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Planet: Partial<Planet>;
  String: Partial<Scalars['String']>;
  Float: Partial<Scalars['Float']>;
  Star: Partial<Star>;
  Satellite: Partial<Satellite>;
  Query: {};
  Boolean: Partial<Scalars['Boolean']>;
}>;

export type PlanetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Planet'] = ResolversParentTypes['Planet']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orbiting?: Resolver<ResolversTypes['Star'], ParentType, ContextType>;
  altitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PlanetType'], ParentType, ContextType>;
  satellites?: Resolver<Array<ResolversTypes['Satellite']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Star'] = ResolversParentTypes['Star']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StarType'], ParentType, ContextType>;
  planets?: Resolver<Array<ResolversTypes['Planet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SatelliteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Satellite'] = ResolversParentTypes['Satellite']> = ResolversObject<{
  orbiting?: Resolver<ResolversTypes['Planet'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  planets?: Resolver<Array<ResolversTypes['Planet']>, ParentType, ContextType>;
  stars?: Resolver<Array<ResolversTypes['Star']>, ParentType, ContextType>;
  satellites?: Resolver<Array<ResolversTypes['Satellite']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Planet?: PlanetResolvers<ContextType>;
  Star?: StarResolvers<ContextType>;
  Satellite?: SatelliteResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export type GetPlanetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlanetsQuery = (
  { __typename?: 'Query' }
  & { planets: Array<(
    { __typename?: 'Planet' }
    & Pick<Planet, 'name' | 'altitude'>
  )> }
);


export const GetPlanetsDocument: DocumentNode<GetPlanetsQuery, GetPlanetsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlanets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"altitude"}}]}}]}}]};