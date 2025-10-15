export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type CreateThreadPayload = {
  title: string
  body: string
  category: string
}

export type CreateCommentPayload = {
  content: string
}

export type ApiResponse<T> = {
  status: string
  message: string
  data: T
}

export type User = {
  id: string
  name: string
  email?: string
  avatar?: string
}

export type Thread = {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  ownerId: string
  upVotesBy: string[]
  downVotesBy: string[]
  totalComments: number
}

export type ThreadDetail = {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  owner: User
  upVotesBy: string[]
  downVotesBy: string[]
  comments: Comment[]
}

export type Comment = {
  id: string
  content: string
  createdAt: string
  owner: User
  upVotesBy: string[]
  downVotesBy: string[]
}

export type ThreadVote = {
  id: string
  userId: string
  threadId: string
  voteType: 1 | 0 | -1
}

export type CommentVote = {
  id: string
  userId: string
  threadId: string
  voteType: 1 | 0 | -1
}

export type Leaderboard = {
  user: User
  score: number
}