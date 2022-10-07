const { gql } = require('apollo-server')
const typeDefs = gql`
    type books {
        title: String!
        published: Int!
        author: author!
        genres: [String!]!
        id: ID!
    }

    type author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type user {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [books!]!
        allAuthors: [author]!
        me: user
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): books
        editAuthor(name: String!, setBornTo: Int!): author
        createUser(username: String!, favoriteGenre: String!): user
        login(username: String!, password: String!): Token
    }

    type Subscription {
        bookAdded: books!
    }
`
module.exports = typeDefs