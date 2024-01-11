"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
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
  input CreateCommnentBucket {
    senderId: String!
    receiverId: String!
    parentId: Int
    text: String!
  }
  type Mutation {
    createUser(inputUser: CreateUserInput): User!
    deleteUser(_id: ID!): User!
    insertCommentBucket(inputComent: CreateCommnentBucket): BucketComment!
  }
  type Subscription {
    insertCommentBucketRealTime(
      inputComent: CreateCommnentBucket
    ): BucketComment!
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=schema.index.js.map