const { gql } = require('apollo-server');

const typeDefs = gql`
  type Record {
    id: ID!
    createdAt: String!
    product: String!
    location: String!
    price: String!
    quantity: String!
    unit: String!
    isOnSale: Boolean
  }

  type User {
    id: ID!
    email: String!
    record: [Record]!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type CreateRecordResponse {
    success: Boolean!
    message: String
    record: Record
  }
  type DeleteRecordResponse {
    success: Boolean!
    message: String
    record: Record
  }

  type Query {
    test: String!
    records: [Record]!
    users: [User]!
    productRecords(product: String!): [Record]!
    record(id: ID!): Record
    me: User
  }

  type Mutation {
    createRecord(
      product: String!,
      location: String!,
      price: String!,
      quantity: String!,
      unit: String!,
      isOnSale: Boolean
    ): CreateRecordResponse!
    deleteRecord(
      id: ID
    ): DeleteRecordResponse!
    signup(email: String!, password: String!): AuthPayload
    login(email: String, password: String!): AuthPayload
  }

  type Subscription {
    recordCreated: Record
  }
`;

export default typeDefs;