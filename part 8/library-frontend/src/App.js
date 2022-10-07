import { useEffect, useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import AuthorsView from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './querries'
import LoginForm from './components/LoginForm'
import RecomendedBooks from './components/recomended'

export const updateCache = (cache, query, bookAdded) => {
    window.alert(`${bookAdded.title} added`)
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })
    }
    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByName(allBooks.concat(bookAdded)),
        }
    })
}

const App = () => {
    const [page, setPage] = useState('authors')
    const { data: autData, loading: autLoading } = useQuery(ALL_AUTHORS)
    const { data: bookData, loading: bookLoading } = useQuery(ALL_BOOKS)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        if (token) {
            setToken(token)
        }
    }, [])

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const { bookAdded } = subscriptionData.data
            window.alert(`${bookAdded.title} added`)
            const updateData = client.readQuery({ query: ALL_BOOKS })
            console.log(updateData)
            client.writeQuery({
                query: ALL_BOOKS,
                data: {
                    ...updateData,
                    allBooks: [...updateData.allBooks, bookAdded],
                },
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('authors')
    }

    const results = client.readQuery({
        query: ALL_BOOKS,
    })

    console.log('cache ', results)
    return (
        <div>
            {!token ? (
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('login')}>login</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('recomended')}>
                        recomended
                    </button>
                    <button onClick={() => setPage('add')}>add book</button>
                    <button onClick={logout}>logout</button>
                </div>
            )}

            <div>
                <AuthorsView
                    show={page === 'authors'}
                    data={autData}
                    loading={autLoading}
                    token={token}
                />

                <Books
                    show={page === 'books'}
                    data={bookData}
                    loading={bookLoading}
                />
                <LoginForm
                    show={page === 'login'}
                    setToken={setToken}
                    setPage={setPage}
                />
                <NewBook show={page === 'add'} />
                <RecomendedBooks show={page === 'recomended'} />
            </div>
        </div>
    )
}

export default App
