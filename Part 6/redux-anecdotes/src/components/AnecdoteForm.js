import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificacionReducer'

const AnecdoteForm = (props) => {

    const addAnec = async (event) => {
        event.preventDefault()
        const datos = event.target.anecdoteIn.value
        event.target.anecdoteIn.value = ''
        props.addAnecdote(datos)

        props.addeMessage(`You added ${datos}`, 4000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div>
                    <input name="anecdoteIn" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(null, { addMessage, addAnecdote })(AnecdoteForm)
