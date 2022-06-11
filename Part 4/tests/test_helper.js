const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
        url: 'wwww.algo.com'
    },
    {
        title: 'Ficciones',
        author: 'Jorge Luis Borges',
        likes: 9,
        url: 'wwww.thebook.com'
    },
    {
        title: 'Cumbres Borrascosas',
        author: 'Emily Brontë',
        likes: 11,
        url: 'wwww.library.com'
    },
    {
        title: 'El extranjero',
        author: 'Albert Camus',
        likes: 15,
        url: 'wwww.bibiliotecanacional.com'
    }
]


const BlogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(elem => elem.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, BlogsInDb, usersInDb
}