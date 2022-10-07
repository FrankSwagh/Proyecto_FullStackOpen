import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment bookDetails on books{
        title
        author{
            name
            born
        }
        published
        genres
    }
`

export const ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
query allBooks ($author: String, $genres: String) {
    allBooks (author: $author, genres: $genres){
        title
        author{
            name
            born
        }
        published
        genres
    }
}
`

export const ADD_BOOK = gql`
    mutation addBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`
export const UPDATE_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
        ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`