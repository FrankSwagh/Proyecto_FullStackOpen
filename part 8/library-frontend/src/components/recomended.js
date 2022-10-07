/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../querries'

const RecomendedBooks = (props) => {
    const [books, setBooks] = useState([])
    //const [user, setUser] = useState([])
    const [allBooks, {loading, dataBooks}] = useLazyQuery(ALL_BOOKS)
    const [me, dataMe] = useLazyQuery(ME)

    useEffect(async () => {
        const tempMe = await me()
        const tempBooks = await allBooks({ variables: { genres: tempMe.data.me.favoriteGenre } })
        
        setBooks(tempBooks.data)
    }, [props.show])


    if (!props.show || loading) return null

    return (
        <div>
            <div>
                <h2>Recomended Books</h2>
                {
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>author</th>
                                <th>published</th>
                            </tr>
                            {books.allBooks.map((a) => (
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.published}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
            <p></p>
        </div>
    )
}

export default RecomendedBooks
