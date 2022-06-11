/* eslint-disable jest/prefer-strict-equal */
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/prefer-expect-assertions */
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    it('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('most voted blog', () => {
    const esperado = [
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 1
        }
    ]
    const listWithBlogs = [
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        },
        {
            title: 'Ficciones',
            author: 'Jorge Luis Borges',
            likes: 9
        },
        {
            title: 'Cumbres Borrascosas',
            author: 'Emily Brontë',
            likes: 11
        },
        {
            title: 'El extranjero',
            author: 'Albert Camus',
            likes: 15
        }
    ]
    it('obtain the most voted blog', () => {
        const result = listHelper.favoriteBlog(listWithBlogs)
        expect(result[0].likes).toBe(15)
    })
})