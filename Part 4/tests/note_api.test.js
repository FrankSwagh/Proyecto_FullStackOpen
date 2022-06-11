/* eslint-disable jest/prefer-strict-equal */
/* eslint-disable jest/no-hooks */
/* eslint-disable jest/prefer-hooks-on-top */
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
jest.setTimeout(10000)
beforeEach(async () => {
    await Blog.deleteMany({})
    const newUser = {
        username: 'root',
        password: 'sekret',
    }
    await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
})
test('los blogs son retornados en formato json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('hay 4 blogs lol', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(4)
})

test('el primer blogs es Canonical string reduction  lol', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body[0].title).toBe('Canonical string reduction')
})

test('todos los blogs son devueltos', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('encontrar un blog en especifico lol', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'El extranjero'
    )
})

test('un blog valido puede ser agregado lol', async () => {
    const newBlog = {
        title: 'El extranjero super',
        author: 'Albert Camus don',
        url: 'wwww.bibiliotecanacional1.com',
        likes: 15
    }
    const newUser = {
        username: 'root',
        password: 'sekret',
    }

    const acceder = await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+acceder.body.token.toString()
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.BlogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titleBlog = blogsAtEnd.map(r => r.title)
    expect(titleBlog).toContain(
        'El extranjero'
    )
})

test('un blog sin url no puede ser agregado lol', async () => {
    const newBlog = {
        title: 'El extranjero',
        author: 'Albert Camus',
        likes: 15
    }
    const newUser = {
        username: 'root',
        password: 'sekret',
    }
    const acceder = await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+acceder.body.token.toString()
        })
        .expect(400)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('viendo un blog en especifico lol', async () => {
    const blogsAtStart = await helper.BlogsInDb()

    const blogsToView = blogsAtStart[0]

    const resultBlogs = await api
        .get(`/api/blogs/${blogsToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogsToView = JSON.parse(JSON.stringify(blogsToView))

    expect(resultBlogs.body).toEqual(processedBlogsToView)
})

test('borrar un blog lul', async () => {
    const blogssAtStart = await helper.BlogsInDb()
    const blogsToDelete = blogssAtStart[0]

    const newUser = {
        username: 'root',
        password: 'sekret',
    }
    const resultBlogs = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log(resultBlogs.body)

    const acceder = await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .delete(`/api/blogs/${blogsToDelete.id}`)
        .set({
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+acceder.body.token.toString()
        })
        .expect(204)

    const blogssAtEnd = await helper.BlogsInDb()

    expect(blogssAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogssAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogsToDelete.title)
})

afterAll(() => {
    mongoose.connection.close()
})