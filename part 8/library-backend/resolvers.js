const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Books = require('./models/books')
const Author = require('./models/authors')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'supersegura'

const resolvers = {
    Query: {
        bookCount: () => Books.collection.countDocuments,
        authorCount: () => Author.collection.countDocuments,
        allBooks: async (root, args) => {
            const dataBooks = await Books.find({}).populate('author')

            if (!(args.author || args.genres)) {
                return dataBooks
            } else if (!args.genres) {
                return dataBooks.filter((au) => args.author === au.author)
            } else if (!args.author) {
                return dataBooks.filter((book) => {
                    if (book.genres.find((gen) => gen === args.genres)) {
                        return true
                    }
                    return false
                })
            }
            return dataBooks.filter((elem) => {
                if (elem.author !== args.author) return false
                if (elem.genres.find((gen) => gen === args.genres)) return true
                return false
            })
        },
        allAuthors: async () => {
            const dataAuthor = await Author.find({})
            const dataBooks = await Books.find({}).populate('author')

            return dataAuthor.map((aut) => {
                const bookCount = dataBooks.reduce(
                    (a, book) => (book.author.name == aut.name ? a + 1 : a),
                    0
                )
                return {
                    name: aut.name,
                    id: aut._id,
                    born: aut.born,
                    bookCount,
                }
            })
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) throw new UserInputError('Unauthorized')
            const exist = await Author.find({})

            if (args.title < 4 || args.author < 4) {
                throw new UserInputError('Author or title is too short')
            }

            if (!exist.find((elem) => elem.name === args.author)) {
                let newAuthor = new Author({ name: args.author })
                await newAuthor.save()
            }

            const authorExist = await Author.findOne({ name: args.author })
            const book = new Books({ ...args, author: authorExist })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            pubsub.publish('ADD_BOOK', { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) throw new UserInputError('Unauthorized')

            const exist = await Author.find({})

            if (exist.find((elem) => elem.name === args.name)) {
                const updateAuthor = await Author.findOneAndUpdate(
                    { name: args.name },
                    { ...args, born: args.setBornTo },
                    { new: true }
                )
                return updateAuthor
            } else {
                throw new UserInputError("author doesn't exist")
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== '') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['ADD_BOOK'])
        },
    },
}

module.exports = resolvers
