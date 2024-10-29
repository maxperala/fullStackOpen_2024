const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const AuthorModel = require("./models/Author");
const BookModel = require("./models/Book");
const mongoose = require("mongoose");
require("dotenv").config();
const {GraphQLError} = require("graphql");

const URI = process.env.MONGO_URI;

mongoose.connect(URI).then(() => console.log("Connected to mongoDB"));

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!  
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]!
    ): Book
    editAuthor(
        name: String!
        born: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await BookModel.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await AuthorModel.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      const query = {};
      if (args.author) {
        const author = await AuthorModel.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        } else {
          return [];
        }
      }
      if (args.genre) {
        query.genres = args.genre;
      }
      return await BookModel.find(query).populate("author");
    },
    allAuthors: async () => {
      return await AuthorModel.find({});
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const booksFromDB = await BookModel.find({}).populate("author");
      return booksFromDB.filter((book) => book.author.name === root.name).length;
    }

  },

  Mutation: {
    addBook: async (root, args) => {
      let authorFromDB = await AuthorModel.findOne({name: args.author});
      if (!authorFromDB) {
        authorFromDB = AuthorModel({name: args.author, born: args.born ? args.born : null});
        try {
          await authorFromDB.save();
        } catch (error) {
          throw new GraphQLError("Creating author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author, error
            }
          })
        }
        
      } 
      const book = new BookModel({...args, author: authorFromDB._id});
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Creating book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title, error
          }
        })
      }

      return book.populate("author");
    },
    editAuthor: async (root, args) => {
      const guy = await AuthorModel.findOne({name: args.name});
      if (!guy) {
        return null;
      }
      guy.born = args.born;
      await guy.save();
      return guy;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
