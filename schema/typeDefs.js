const { gql } = require("apollo-server-express");

module.exports = gql`
  type Author {
    name: String
    image: String
  }

  type Pin {
    id: ID!
    title: String!
    description: String
    image: String
    link: String!
    author: Author
    category: String
    isActive: Boolean
  }

  input AuthorInput {
    name: String
    image: String
  }

  input PinInput {
    title: String!
    description: String
    image: String!
    link: String!
    author: AuthorInput
    category: String
    isActive: Boolean
  }

  type Query {
    pins: [Pin]
  }

  type Mutation {
    createPin(pin: PinInput!): Pin!
  }
`;
