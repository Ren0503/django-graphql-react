import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
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
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type AcceptFollow = {
  __typename?: 'AcceptFollow';
  success?: Maybe<Scalars['Boolean']>;
};


export type DeleteTweet = {
  __typename?: 'DeleteTweet';
  success?: Maybe<Scalars['Boolean']>;
};


export type FollowUser = {
  __typename?: 'FollowUser';
  success?: Maybe<Scalars['Boolean']>;
  isFollowed?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserWithFollowNode>;
  isRequested?: Maybe<Scalars['Boolean']>;
};


export type LikeMutation = {
  __typename?: 'LikeMutation';
  success?: Maybe<Scalars['Boolean']>;
  isLiked?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  success?: Maybe<Scalars['Boolean']>;
  follow?: Maybe<FollowUser>;
  acceptFollow?: Maybe<AcceptFollow>;
  postTweet?: Maybe<PostTweet>;
  likeTweet?: Maybe<LikeMutation>;
  retweet?: Maybe<RetweetMutation>;
  deleteTweet?: Maybe<DeleteTweet>;
  refetch?: Maybe<RefetchMutation>;
  /**
   * Register user with fields defined in the settings.
   *
   * If the email field of the user model is part of the
   * registration fields (default), check if there is
   * no user with that email or as a secondary email.
   *
   * If it exists, it does not register the user,
   * even if the email field is not defined as unique
   * (default of the default django user model).
   *
   * When creating the user, it also creates a `UserStatus`
   * related to that user, making it possible to track
   * if the user is archived, verified and has a secondary
   * email.
   *
   * Send account verification email.
   *
   * If allowed to not verified users login, return token.
   */
  register?: Maybe<Register>;
  /**
   * Update user model fields, defined on settings.
   *
   * User must be verified.
   */
  updateAccount?: Maybe<UpdateAccount>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
};


export type MutationFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationAcceptFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationPostTweetArgs = {
  commentTo?: Maybe<Scalars['Int']>;
  file?: Maybe<Scalars['Upload']>;
  text: Scalars['String'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['Int'];
};


export type MutationRetweetArgs = {
  tweetId: Scalars['Int'];
};


export type MutationDeleteTweetArgs = {
  id: Scalars['Int'];
};


export type MutationRefetchArgs = {
  data?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  displayName: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  user?: Maybe<UserNode>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  refreshToken?: Maybe<Scalars['String']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type PostTweet = {
  __typename?: 'PostTweet';
  tweet?: Maybe<TweetNode>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  followers?: Maybe<UserWithFollowNodeConnection>;
  following?: Maybe<UserWithFollowNodeConnection>;
  unfollowed?: Maybe<UserWithFollowNodeConnection>;
  tweets?: Maybe<TweetNodeConnection>;
  tweet?: Maybe<TweetNode>;
  me?: Maybe<UserWithFollowNode>;
  user?: Maybe<UserWithFollowNode>;
  users?: Maybe<UserWithFollowNodeConnection>;
};


export type QueryFollowersArgs = {
  uname: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
  username_Istartswith?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  status_Archived?: Maybe<Scalars['Boolean']>;
  status_Verified?: Maybe<Scalars['Boolean']>;
  status_SecondaryEmail?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type QueryFollowingArgs = {
  uname: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
  username_Istartswith?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  status_Archived?: Maybe<Scalars['Boolean']>;
  status_Verified?: Maybe<Scalars['Boolean']>;
  status_SecondaryEmail?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type QueryUnfollowedArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
  username_Istartswith?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  status_Archived?: Maybe<Scalars['Boolean']>;
  status_Verified?: Maybe<Scalars['Boolean']>;
  status_SecondaryEmail?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type QueryTweetsArgs = {
  commentToPk?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  excludeComment?: Maybe<Scalars['Boolean']>;
  timeline?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};


export type QueryTweetArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
  username_Istartswith?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  status_Archived?: Maybe<Scalars['Boolean']>;
  status_Verified?: Maybe<Scalars['Boolean']>;
  status_SecondaryEmail?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type RefetchMutation = {
  __typename?: 'RefetchMutation';
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  token?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
};

/**
 * Register user with fields defined in the settings.
 *
 * If the email field of the user model is part of the
 * registration fields (default), check if there is
 * no user with that email or as a secondary email.
 *
 * If it exists, it does not register the user,
 * even if the email field is not defined as unique
 * (default of the default django user model).
 *
 * When creating the user, it also creates a `UserStatus`
 * related to that user, making it possible to track
 * if the user is archived, verified and has a secondary
 * email.
 *
 * Send account verification email.
 *
 * If allowed to not verified users login, return token.
 */
export type Register = {
  __typename?: 'Register';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type RetweetMutation = {
  __typename?: 'RetweetMutation';
  success?: Maybe<Scalars['Boolean']>;
  isRetweeted?: Maybe<Scalars['Boolean']>;
};

export type TweetNode = Node & {
  __typename?: 'TweetNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  user?: Maybe<UserWithFollowNode>;
  createdAt: Scalars['DateTime'];
  text?: Maybe<Scalars['String']>;
  commentTo?: Maybe<TweetNode>;
  image?: Maybe<Scalars['String']>;
  likes?: Maybe<UserWithFollowNodeConnection>;
  comments: TweetNodeConnection;
  pk?: Maybe<Scalars['Int']>;
  likesCount?: Maybe<Scalars['Int']>;
  retweetCount?: Maybe<Scalars['Int']>;
  commentsCount?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
};


export type TweetNodeLikesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
  username_Istartswith?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  status_Archived?: Maybe<Scalars['Boolean']>;
  status_Verified?: Maybe<Scalars['Boolean']>;
  status_SecondaryEmail?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type TweetNodeCommentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};

export type TweetNodeConnection = {
  __typename?: 'TweetNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TweetNodeEdge>>;
};

/** A Relay edge containing a `TweetNode` and its cursor. */
export type TweetNodeEdge = {
  __typename?: 'TweetNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TweetNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * Update user model fields, defined on settings.
 *
 * User must be verified.
 */
export type UpdateAccount = {
  __typename?: 'UpdateAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};


export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  /** Required. 30 characters or fewer. Letters and digits. */
  username: Scalars['String'];
  bio: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
  tweets: TweetNodeConnection;
  likes: TweetNodeConnection;
  retweets: TweetNodeConnection;
  pk?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  secondaryEmail?: Maybe<Scalars['String']>;
};


export type UserNodeTweetsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};


export type UserNodeLikesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};


export type UserNodeRetweetsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};

export type UserWithFollowNode = Node & {
  __typename?: 'UserWithFollowNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  /** Required. 30 characters or fewer. Letters and digits. */
  username: Scalars['String'];
  bio: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
  tweets: TweetNodeConnection;
  likes: TweetNodeConnection;
  retweets: TweetNodeConnection;
  pk?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  secondaryEmail?: Maybe<Scalars['String']>;
  followersCount?: Maybe<Scalars['Int']>;
  followingCount?: Maybe<Scalars['Int']>;
  isSelf?: Maybe<Scalars['Boolean']>;
  isFollowed?: Maybe<Scalars['Boolean']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  isRequested?: Maybe<Scalars['Boolean']>;
};


export type UserWithFollowNodeTweetsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};


export type UserWithFollowNodeLikesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};


export type UserWithFollowNodeRetweetsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  commentTo?: Maybe<Scalars['ID']>;
};

export type UserWithFollowNodeConnection = {
  __typename?: 'UserWithFollowNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserWithFollowNodeEdge>>;
};

/** A Relay edge containing a `UserWithFollowNode` and its cursor. */
export type UserWithFollowNodeEdge = {
  __typename?: 'UserWithFollowNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<UserWithFollowNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'UserWithFollowNode' }
  & Pick<UserWithFollowNode, 'id' | 'displayName' | 'email' | 'username' | 'bio' | 'pk' | 'photo' | 'verified' | 'followersCount' | 'followingCount' | 'isFollowed' | 'isFollowing' | 'isSelf' | 'private' | 'isRequested'>
);

export type DeleteTweetMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTweetMutation = (
  { __typename?: 'Mutation' }
  & { deleteTweet?: Maybe<(
    { __typename?: 'DeleteTweet' }
    & Pick<DeleteTweet, 'success'>
  )> }
);

export type FollowMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FollowMutation = (
  { __typename?: 'Mutation' }
  & { follow?: Maybe<(
    { __typename?: 'FollowUser' }
    & Pick<FollowUser, 'success' | 'isFollowed' | 'isRequested'>
    & { user?: Maybe<(
      { __typename?: 'UserWithFollowNode' }
      & RegularUserFragment
    )> }
  )> }
);

export type LikeTweetMutationVariables = Exact<{
  tweetId: Scalars['Int'];
}>;


export type LikeTweetMutation = (
  { __typename?: 'Mutation' }
  & { likeTweet?: Maybe<(
    { __typename?: 'LikeMutation' }
    & Pick<LikeMutation, 'success' | 'isLiked'>
  )> }
);

export type LoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { tokenAuth?: Maybe<(
    { __typename?: 'ObtainJSONWebToken' }
    & Pick<ObtainJsonWebToken, 'token' | 'refreshToken' | 'success' | 'errors'>
    & { user?: Maybe<(
      { __typename?: 'UserNode' }
      & Pick<UserNode, 'id' | 'pk' | 'displayName' | 'username' | 'email' | 'bio' | 'photo' | 'verified'>
    )> }
  )> }
);

export type PostTweetMutationVariables = Exact<{
  text: Scalars['String'];
  file?: Maybe<Scalars['Upload']>;
  commentTo?: Maybe<Scalars['Int']>;
}>;


export type PostTweetMutation = (
  { __typename?: 'Mutation' }
  & { postTweet?: Maybe<(
    { __typename?: 'PostTweet' }
    & Pick<PostTweet, 'success'>
    & { tweet?: Maybe<(
      { __typename?: 'TweetNode' }
      & Pick<TweetNode, 'id' | 'pk' | 'text' | 'createdAt' | 'likesCount' | 'retweetCount' | 'isLiked'>
    )> }
  )> }
);

export type RefetchDataMutationVariables = Exact<{
  data?: Maybe<Scalars['String']>;
}>;


export type RefetchDataMutation = (
  { __typename?: 'Mutation' }
  & { refetch?: Maybe<(
    { __typename?: 'RefetchMutation' }
    & Pick<RefetchMutation, 'success'>
  )> }
);

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { refreshToken?: Maybe<(
    { __typename?: 'RefreshToken' }
    & Pick<RefreshToken, 'success' | 'errors' | 'token' | 'refreshToken'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  displayName: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'Register' }
    & Pick<Register, 'success' | 'errors' | 'token' | 'refreshToken'>
  )> }
);

export type RetweetTweetMutationVariables = Exact<{
  tweetId: Scalars['Int'];
}>;


export type RetweetTweetMutation = (
  { __typename?: 'Mutation' }
  & { retweet?: Maybe<(
    { __typename?: 'RetweetMutation' }
    & Pick<RetweetMutation, 'success' | 'isRetweeted'>
  )> }
);

export type FollowersQueryVariables = Exact<{
  username: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type FollowersQuery = (
  { __typename?: 'Query' }
  & { followers?: Maybe<(
    { __typename?: 'UserWithFollowNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserWithFollowNodeEdge' }
      & Pick<UserWithFollowNodeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'UserWithFollowNode' }
        & RegularUserFragment
      )> }
    )>> }
  )> }
);

export type FollowingQueryVariables = Exact<{
  username: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type FollowingQuery = (
  { __typename?: 'Query' }
  & { following?: Maybe<(
    { __typename?: 'UserWithFollowNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserWithFollowNodeEdge' }
      & Pick<UserWithFollowNodeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'UserWithFollowNode' }
        & RegularUserFragment
      )> }
    )>> }
  )> }
);

export type GetTweetsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  commentTo?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  excludeComment?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  timeline?: Maybe<Scalars['Boolean']>;
  commentToPk?: Maybe<Scalars['Int']>;
}>;


export type GetTweetsQuery = (
  { __typename?: 'Query' }
  & { tweets?: Maybe<(
    { __typename?: 'TweetNodeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ), edges: Array<Maybe<(
      { __typename?: 'TweetNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'TweetNode' }
        & Pick<TweetNode, 'id' | 'pk' | 'text' | 'createdAt' | 'likesCount' | 'retweetCount' | 'commentsCount' | 'isLiked' | 'image'>
        & { user?: Maybe<(
          { __typename?: 'UserWithFollowNode' }
          & RegularUserFragment
        )> }
      )> }
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserWithFollowNode' }
    & RegularUserFragment
  )> }
);

export type TweetDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TweetDetailQuery = (
  { __typename?: 'Query' }
  & { tweet?: Maybe<(
    { __typename?: 'TweetNode' }
    & Pick<TweetNode, 'id' | 'pk' | 'text' | 'createdAt' | 'likesCount' | 'retweetCount' | 'commentsCount' | 'isLiked' | 'image'>
    & { user?: Maybe<(
      { __typename?: 'UserWithFollowNode' }
      & RegularUserFragment
    )> }
  )> }
);

export type UnfollowedQueryVariables = Exact<{ [key: string]: never; }>;


export type UnfollowedQuery = (
  { __typename?: 'Query' }
  & { unfollowed?: Maybe<(
    { __typename?: 'UserWithFollowNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserWithFollowNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'UserWithFollowNode' }
        & RegularUserFragment
      )> }
    )>> }
  )> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserWithFollowNode' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on UserWithFollowNode {
  id
  displayName
  email
  username
  bio
  pk
  photo
  verified
  followersCount
  followingCount
  isFollowed
  isFollowing
  isSelf
  private
  isRequested
}
    `;
export const DeleteTweetDocument = gql`
    mutation DeleteTweet($id: Int!) {
  deleteTweet(id: $id) {
    success
  }
}
    `;

export function useDeleteTweetMutation() {
  return Urql.useMutation<DeleteTweetMutation, DeleteTweetMutationVariables>(DeleteTweetDocument);
};
export const FollowDocument = gql`
    mutation Follow($userId: Int!) {
  follow(userId: $userId) {
    success
    isFollowed
    user {
      ...RegularUser
    }
    isRequested
  }
}
    ${RegularUserFragmentDoc}`;

export function useFollowMutation() {
  return Urql.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument);
};
export const LikeTweetDocument = gql`
    mutation LikeTweet($tweetId: Int!) {
  likeTweet(tweetId: $tweetId) {
    success
    isLiked
  }
}
    `;

export function useLikeTweetMutation() {
  return Urql.useMutation<LikeTweetMutation, LikeTweetMutationVariables>(LikeTweetDocument);
};
export const LoginDocument = gql`
    mutation login($username: String, $password: String!, $email: String) {
  tokenAuth(username: $username, password: $password, email: $email) {
    token
    refreshToken
    success
    errors
    user {
      id
      pk
      displayName
      username
      email
      bio
      photo
      verified
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const PostTweetDocument = gql`
    mutation PostTweet($text: String!, $file: Upload, $commentTo: Int) {
  postTweet(text: $text, file: $file, commentTo: $commentTo) {
    success
    tweet {
      id
      pk
      text
      createdAt
      likesCount
      retweetCount
      isLiked
    }
  }
}
    `;

export function usePostTweetMutation() {
  return Urql.useMutation<PostTweetMutation, PostTweetMutationVariables>(PostTweetDocument);
};
export const RefetchDataDocument = gql`
    mutation RefetchData($data: String) {
  refetch(data: $data) {
    success
  }
}
    `;

export function useRefetchDataMutation() {
  return Urql.useMutation<RefetchDataMutation, RefetchDataMutationVariables>(RefetchDataDocument);
};
export const RefreshTokenDocument = gql`
    mutation refreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    success
    errors
    token
    refreshToken
  }
}
    `;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument);
};
export const RegisterDocument = gql`
    mutation register($email: String!, $username: String!, $displayName: String!, $password1: String!, $password2: String!) {
  register(
    email: $email
    username: $username
    displayName: $displayName
    password1: $password1
    password2: $password2
  ) {
    success
    errors
    token
    refreshToken
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RetweetTweetDocument = gql`
    mutation RetweetTweet($tweetId: Int!) {
  retweet(tweetId: $tweetId) {
    success
    isRetweeted
  }
}
    `;

export function useRetweetTweetMutation() {
  return Urql.useMutation<RetweetTweetMutation, RetweetTweetMutationVariables>(RetweetTweetDocument);
};
export const FollowersDocument = gql`
    query Followers($username: String!, $after: String, $first: Int) {
  followers(uname: $username, after: $after, first: $first) {
    edges {
      cursor
      node {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useFollowersQuery(options: Omit<Urql.UseQueryArgs<FollowersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FollowersQuery>({ query: FollowersDocument, ...options });
};
export const FollowingDocument = gql`
    query Following($username: String!, $after: String, $first: Int) {
  following(uname: $username, after: $after, first: $first) {
    edges {
      cursor
      node {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useFollowingQuery(options: Omit<Urql.UseQueryArgs<FollowingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FollowingQuery>({ query: FollowingDocument, ...options });
};
export const GetTweetsDocument = gql`
    query getTweets($after: String, $commentTo: ID, $first: Int, $username: String, $excludeComment: Boolean, $offset: Int, $timeline: Boolean, $commentToPk: Int) {
  tweets(
    after: $after
    commentTo: $commentTo
    first: $first
    username: $username
    excludeComment: $excludeComment
    offset: $offset
    timeline: $timeline
    commentToPk: $commentToPk
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        user {
          ...RegularUser
        }
        id
        pk
        text
        createdAt
        likesCount
        retweetCount
        commentsCount
        isLiked
        image
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetTweetsQuery(options: Omit<Urql.UseQueryArgs<GetTweetsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetsQuery>({ query: GetTweetsDocument, ...options });
};
export const MeDocument = gql`
    query me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const TweetDetailDocument = gql`
    query tweetDetail($id: Int!) {
  tweet(id: $id) {
    user {
      ...RegularUser
    }
    id
    pk
    text
    createdAt
    likesCount
    retweetCount
    commentsCount
    isLiked
    image
  }
}
    ${RegularUserFragmentDoc}`;

export function useTweetDetailQuery(options: Omit<Urql.UseQueryArgs<TweetDetailQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TweetDetailQuery>({ query: TweetDetailDocument, ...options });
};
export const UnfollowedDocument = gql`
    query Unfollowed {
  unfollowed {
    edges {
      node {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useUnfollowedQuery(options: Omit<Urql.UseQueryArgs<UnfollowedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UnfollowedQuery>({ query: UnfollowedDocument, ...options });
};
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};