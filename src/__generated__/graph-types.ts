import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApplicationContext } from '../../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ChangePasswordRequest = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type CreateMovieRequest = {
  description: Scalars['String'];
  directorName: Scalars['String'];
  movieName: Scalars['String'];
  releaseDate: Scalars['Date'];
};

export type CreateReviewRequest = {
  comment: Scalars['String'];
  movieId: Scalars['Int'];
  rating: Scalars['Int'];
  userId: Scalars['Int'];
};

export type LoginCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  email: Scalars['String'];
  id: Scalars['Int'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  description: Scalars['String'];
  directorName: Scalars['String'];
  movieName: Scalars['String'];
  releaseDate: Scalars['Date'];
};

export type MovieFilters = {
  description?: InputMaybe<Scalars['String']>;
  directorName?: InputMaybe<Scalars['String']>;
  movieName?: InputMaybe<Scalars['String']>;
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type MovieResponse = {
  __typename?: 'MovieResponse';
  description: Scalars['String'];
  directorName: Scalars['String'];
  id: Scalars['Int'];
  movieName: Scalars['String'];
  releaseDate: Scalars['Date'];
  user?: Maybe<UserResponse>;
};

export type MovieSortFields = {
  field: SortingMovieFields;
  isAscending: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<User>;
  createMovie?: Maybe<MovieResponse>;
  createReview?: Maybe<ReviewResponse>;
  deleteMovie?: Maybe<MovieResponse>;
  deleteReview?: Maybe<ReviewResponse>;
  signup?: Maybe<User>;
  updateMovie?: Maybe<MovieResponse>;
  updateReview?: Maybe<ReviewResponse>;
};


export type MutationChangePasswordArgs = {
  credentials: ChangePasswordRequest;
};


export type MutationCreateMovieArgs = {
  movie: CreateMovieRequest;
};


export type MutationCreateReviewArgs = {
  review?: InputMaybe<CreateReviewRequest>;
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationSignupArgs = {
  user: UserSignup;
};


export type MutationUpdateMovieArgs = {
  id: Scalars['Int'];
  movie: UpdateMovieRequest;
};


export type MutationUpdateReviewArgs = {
  id: Scalars['Int'];
  review: UpdateReviewRequest;
};

export type PaginatedMovieList = {
  __typename?: 'PaginatedMovieList';
  meta: PaginationResponse;
  movies: Array<Maybe<MovieResponse>>;
};

export type PaginatedReviewList = {
  __typename?: 'PaginatedReviewList';
  meta: PaginationResponse;
  reviews: Array<Maybe<ReviewResponse>>;
};

export type PaginationFields = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  pageSize: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getMovie?: Maybe<MovieResponse>;
  listMovies?: Maybe<PaginatedMovieList>;
  listReviews?: Maybe<PaginatedReviewList>;
  login?: Maybe<LoginResponse>;
};


export type QueryGetMovieArgs = {
  id: Scalars['Int'];
};


export type QueryListMoviesArgs = {
  filter?: InputMaybe<MovieFilters>;
  pagination?: InputMaybe<PaginationFields>;
  sort?: InputMaybe<MovieSortFields>;
};


export type QueryListReviewsArgs = {
  filter?: InputMaybe<ReviewFilters>;
  movieId: Scalars['Int'];
  pagination?: InputMaybe<PaginationFields>;
  sort?: InputMaybe<ReviewSortFields>;
};


export type QueryLoginArgs = {
  credentials: LoginCredentials;
};

export type ReviewFilters = {
  comment?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Int']>;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  comment: Scalars['String'];
  id: Scalars['Int'];
  movie?: Maybe<MovieResponse>;
  rating: Scalars['Int'];
  user?: Maybe<UserResponse>;
};

export type ReviewSortFields = {
  field: SortingReviewFields;
  isAscending: Scalars['Boolean'];
};

export enum SortingMovieFields {
  DirectorName = 'directorName',
  Id = 'id',
  MovieName = 'movieName',
  ReleaseDate = 'releaseDate'
}

export enum SortingReviewFields {
  Id = 'id',
  Rating = 'rating'
}

export type UpdateMovieRequest = {
  description?: InputMaybe<Scalars['String']>;
  directorName?: InputMaybe<Scalars['String']>;
  movieName?: InputMaybe<Scalars['String']>;
  releaseDate?: InputMaybe<Scalars['Date']>;
};

export type UpdateReviewRequest = {
  comment?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  email: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type UserSignup = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChangePasswordRequest: ChangePasswordRequest;
  CreateMovieRequest: CreateMovieRequest;
  CreateReviewRequest: CreateReviewRequest;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginCredentials: LoginCredentials;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieFilters: MovieFilters;
  MovieResponse: ResolverTypeWrapper<MovieResponse>;
  MovieSortFields: MovieSortFields;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedMovieList: ResolverTypeWrapper<PaginatedMovieList>;
  PaginatedReviewList: ResolverTypeWrapper<PaginatedReviewList>;
  PaginationFields: PaginationFields;
  PaginationResponse: ResolverTypeWrapper<PaginationResponse>;
  Query: ResolverTypeWrapper<{}>;
  ReviewFilters: ReviewFilters;
  ReviewResponse: ResolverTypeWrapper<ReviewResponse>;
  ReviewSortFields: ReviewSortFields;
  SortingMovieFields: SortingMovieFields;
  SortingReviewFields: SortingReviewFields;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateMovieRequest: UpdateMovieRequest;
  UpdateReviewRequest: UpdateReviewRequest;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserSignup: UserSignup;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ChangePasswordRequest: ChangePasswordRequest;
  CreateMovieRequest: CreateMovieRequest;
  CreateReviewRequest: CreateReviewRequest;
  Date: Scalars['Date'];
  Int: Scalars['Int'];
  LoginCredentials: LoginCredentials;
  LoginResponse: LoginResponse;
  Movie: Movie;
  MovieFilters: MovieFilters;
  MovieResponse: MovieResponse;
  MovieSortFields: MovieSortFields;
  Mutation: {};
  PaginatedMovieList: PaginatedMovieList;
  PaginatedReviewList: PaginatedReviewList;
  PaginationFields: PaginationFields;
  PaginationResponse: PaginationResponse;
  Query: {};
  ReviewFilters: ReviewFilters;
  ReviewResponse: ReviewResponse;
  ReviewSortFields: ReviewSortFields;
  String: Scalars['String'];
  UpdateMovieRequest: UpdateMovieRequest;
  UpdateReviewRequest: UpdateReviewRequest;
  User: User;
  UserResponse: UserResponse;
  UserSignup: UserSignup;
}>;

export type ProtectedDirectiveArgs = { };

export type ProtectedDirectiveResolver<Result, Parent, ContextType = ApplicationContext, Args = ProtectedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LoginResponseResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  directorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  movieName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResponseResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['MovieResponse'] = ResolversParentTypes['MovieResponse']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  directorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  movieName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'credentials'>>;
  createMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<MutationCreateMovieArgs, 'movie'>>;
  createReview?: Resolver<Maybe<ResolversTypes['ReviewResponse']>, ParentType, ContextType, Partial<MutationCreateReviewArgs>>;
  deleteMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'id'>>;
  deleteReview?: Resolver<Maybe<ResolversTypes['ReviewResponse']>, ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  signup?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'user'>>;
  updateMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'id' | 'movie'>>;
  updateReview?: Resolver<Maybe<ResolversTypes['ReviewResponse']>, ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id' | 'review'>>;
}>;

export type PaginatedMovieListResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['PaginatedMovieList'] = ResolversParentTypes['PaginatedMovieList']> = ResolversObject<{
  meta?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  movies?: Resolver<Array<Maybe<ResolversTypes['MovieResponse']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedReviewListResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['PaginatedReviewList'] = ResolversParentTypes['PaginatedReviewList']> = ResolversObject<{
  meta?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  reviews?: Resolver<Array<Maybe<ResolversTypes['ReviewResponse']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationResponseResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['PaginationResponse'] = ResolversParentTypes['PaginationResponse']> = ResolversObject<{
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<QueryGetMovieArgs, 'id'>>;
  listMovies?: Resolver<Maybe<ResolversTypes['PaginatedMovieList']>, ParentType, ContextType, Partial<QueryListMoviesArgs>>;
  listReviews?: Resolver<Maybe<ResolversTypes['PaginatedReviewList']>, ParentType, ContextType, RequireFields<QueryListReviewsArgs, 'movieId'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'credentials'>>;
}>;

export type ReviewResponseResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['ReviewResponse'] = ResolversParentTypes['ReviewResponse']> = ResolversObject<{
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  movie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApplicationContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieResponse?: MovieResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedMovieList?: PaginatedMovieListResolvers<ContextType>;
  PaginatedReviewList?: PaginatedReviewListResolvers<ContextType>;
  PaginationResponse?: PaginationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReviewResponse?: ReviewResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ApplicationContext> = ResolversObject<{
  protected?: ProtectedDirectiveResolver<any, any, ContextType>;
}>;
