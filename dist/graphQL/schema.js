"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    Books: [Book]
    Book(id: ID!): Book
    Authors: [Author]
    Author(id: ID!): Author
    User(id: ID!): User!
    Users: [User]
  }
  # Book
  type Book {
    id: ID
    name: String
    author: Author
  }
  #Author
  type Author {
    id: ID
    name: String
    born: String
    death: String
    country: String
    book: [Book]
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
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(inputUser: CreateUserInput): User
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=schema.js.map