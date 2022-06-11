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
const bcrypt = require('bcryptjs')
const User = require('../models/user')

describe('cuando solo hay un usuario lel', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()

        const passwordHash1 = await bcrypt.hash('supersecreta', 10)
        const user1 = new User({ username: 'Frank', passwordHash1 })
        await user1.save()
    })

    it('creacion de un nuevo usuario lel', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'FrankSwagh',
            name: 'Frank Cabrera',
            password: 'supersegura',
        }
        const cosos = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log(cosos.body, cosos.body.length)

        const coso = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        console.log(coso)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    it('creation fails with proper statuscode and message if username already taken lel', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'sekret',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
afterAll(() => {
    mongoose.connection.close()
})