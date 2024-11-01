const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const AuthorModel = require("./models/Author");
const BookModel = require("./models/Book");
const UserModel = require("./models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { GraphQLError } = require("graphql");

const URI = process.env.MONGO_URI;

mongoose.connect(URI).then(() => console.log("Connected to mongoDB"));

function checkUser(user) {
  if (!user) {
    throw new GraphQLError("wrong credentials", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }
}

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    favoriteBooks: Favorites
    allAuthors: [Author]!
    me: User
  }
  type Favorites {
    books: [Book]!
    genre: String!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
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
        query.genres = { $in: [args.genre] };
      }
      return await BookModel.find(query).populate("author");
    },
    allAuthors: async () => {
      return await AuthorModel.find({});
    },
    favoriteBooks: async (root, args, context) => {
      checkUser(context.user);
      const query = { genres: { $in: [context.user.favoriteGenre] } };
      const books = await BookModel.find(query).populate("author");
      return {
        books,
        genre: context.user.favoriteGenre,
      };
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const booksFromDB = await BookModel.find({}).populate("author");
      return booksFromDB.filter((book) => book.author.name === root.name)
        .length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      checkUser(context.user);
      let authorFromDB = await AuthorModel.findOne({ name: args.author });
      if (!authorFromDB) {
        authorFromDB = AuthorModel({
          name: args.author,
          born: args.born ? args.born : null,
        });
        try {
          await authorFromDB.save();
        } catch (error) {
          throw new GraphQLError("Creating author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const book = new BookModel({ ...args, author: authorFromDB._id });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Creating book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return book.populate("author");
    },
    editAuthor: async (root, args, context) => {
      checkUser(context.user);
      const guy = await AuthorModel.findOne({ name: args.name });
      if (!guy) {
        return null;
      }
      guy.born = args.born;
      await guy.save();
      return guy;
    },
    createUser: async (root, args) => {
      const user = new UserModel({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.username, args.favoriteGenre],
            error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username });
      if (args.password !== "password" || !user) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const token = auth.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET);
      const user = await UserModel.findById(decode.id);
      return { user };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
