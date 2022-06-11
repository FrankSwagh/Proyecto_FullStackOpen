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

describe('probando blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObject = helper.initialBlogs
            .map(elem => new Blog(elem))
        const promiseArray = blogObject.map(elem => elem.save())
        await Promise.all(promiseArray)
    })

    it('obtener toda la lista', async () => {
        const blogsAtStart = await helper.BlogsInDb()
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogsToView = JSON.parse(JSON.stringify(blogsAtStart))
        expect(response.body).toEqual(processedBlogsToView)
    })

    it('verificar que sea unico', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body[0].id).toBeDefined()
    })

    it('publicar un nuevo blog lol', async () => {
        jest.setTimeout(10000)
        const newBlog = {
            title: 'El Señor de los Anillos',
            author: 'J.R.R. Tolkien',
            likes: 21,
            url: 'wwww.ellibreromayor.com'
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
            .expect('Content-Type', /application\/json/,  )

        const blogsAtEnd = await helper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titleBlog = blogsAtEnd.map(r => r.title)
        expect(titleBlog).toContain(
            'El Señor de los Anillos'
        )
    })

    it('comprobar que no existan likes lol', async () => {
        const newBlog = {
            title: 'El Señor de los Anillos',
            author: 'J.R.R. Tolkien',
            url: 'wwww.ellibreromayor.com'
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
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    it('verificar que no exista url y titulo lol', async () => {
        const newBlog = {
            author: 'J.R.R. Tolkien',
            likes: 1
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
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.BlogsInDb()
        console.log(blogsAtEnd)
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})



afterAll(() => {
    mongoose.connection.close()
})