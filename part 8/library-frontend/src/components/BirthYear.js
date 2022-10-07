import { useState } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../querries'
import { useMutation } from '@apollo/client'

const BornView = (props) => {
    const [name, setName] = useState('None')
    const [year, setYear] = useState('')

    const [editAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error)
        },
    })

    const authorsList = [{name: 'None'}]
    props.authors.forEach(elem => authorsList.push(elem))

    const handleChange = (event) => {
        setName( event.target.value)
    }

    const submit = async (event) => {
        console.log(name);
        event.preventDefault()
        const intYear = parseInt(year)
        editAuthor({ variables: { name, setBornTo: intYear } })
        setName('none')
        setYear('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <h2>Set birthyear</h2>
                <div>
                    Name
                    <select onChange={handleChange}>
                        {authorsList.map((elem) => (
                            <option
                                value={elem.name}
                                key={elem.name}
                            >
                                {elem.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Born
                    <input
                        value={year}
                        onChange={({ target }) => setYear(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BornView
