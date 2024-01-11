import { gql } from 'apollo-server-express'
//
const typeDefs = gql`
   type Query {
      User(id: ID!): User!
      Users: [User]
      BucketComment: BucketComment!
   }
   type User {
      name: String
      email: String
      password: String
      _id: String
   }
   type Users {
      Users: [User]
   }
   type Comment {
      text: String
      commentId: String
      date: String
   }
   type Replies {
      text: String
      commentId: String
      parentId: String
      date: String
   }
   type BucketComment {
      text: String
      senderId: String
      receiverId: String
      comments: [Comment]
      replies: [Replies]
   }
   input CreateUserInput {
      name: String!
      email: String!
      password: String!
   }
   input CreateCommentBucket {
      senderId: String!
      receiverId: String!
      parentId: Int
      text: String!
   }
   type Mutation {
      createUser(inputUser: CreateUserInput): User!
      deleteUser(_id: ID!): User!
      insertCommentBucket(inputComment: CreateCommentBucket): BucketComment!
   }
   type Subscription {
      insertCommentBucketRealTime(inputComment: CreateCommentBucket): BucketComment!
   }
`

export default typeDefs
