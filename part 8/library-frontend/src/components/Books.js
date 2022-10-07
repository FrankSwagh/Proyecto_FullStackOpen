/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../querries'

const Books = (props) => {
    const [books, setBooks] = useState('all genres')
    const [allBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (allBooks && data) {
            setBooks(data.allBooks)
        }
    }, [])

    if (!props.show || loading) {
        return null
    }

    const filteredBooks = props.data.allBooks

    let merged = ['all genres']

    filteredBooks.forEach((e) => {
        e.genres.map((g) => merged.push(g))
    })

    const filteredMerged = [...new Set(merged)]

    const filterGenres = async (gen) => {
        console.log(gen)
        if (gen === 'all genres') setBooks(props.data.allBooks)
        else {
            const dataBooks = await allBooks({ variables: { genres: gen } })
            setBooks(dataBooks.data.allBooks)
        }
    }

    return (
        <div>
            <div>
                <h2>Books</h2>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {books === 'all genres'
                            ? filteredBooks.map((a) => (
                                  <tr key={a.title}>
                                      <td>{a.title}</td>
                                      <td>{a.author.name}</td>
                                      <td>{a.published}</td>
                                  </tr>
                              ))
                            : books.map((a) => (
                                  <tr key={a.title}>
                                      <td>{a.title}</td>
                                      <td>{a.author.name}</td>
                                      <td>{a.published}</td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
            <p></p>
            <div>
                {filteredMerged.map((e) => (
                    <button key={e} onClick={() => filterGenres(e)}>
                        {e}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Books
