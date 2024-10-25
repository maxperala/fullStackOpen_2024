import { gql } from "@apollo/client";


export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            id
            published
        }
    }
`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
          name
          born
          bookCount
        }
    }
`
export const ADD_BOOK = gql`
    mutation($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author
            id
        }
    }
`

export const EDIT_NUMBER = gql`
    mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
        name
        born
  }
}
`
