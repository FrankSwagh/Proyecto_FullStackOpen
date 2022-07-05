import { connect } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificacionReducer'

const AnecdotesList = (props) => {
    const Vote = (id) => {
        const votedAnecdote = props.anecdotes.find(
            (anecdote) => anecdote.id === id
        )
        props.incrementVote(votedAnecdote)

        props.addMessage(`You voted ${votedAnecdote.content}`, 6000)
    }

    console.log(props.filtro) 
    let listAnecdotes = []
    
    if(props.filtro.length !== 0){
        listAnecdotes = props.filtro
        console.log(listAnecdotes)
        listAnecdotes.sort((a, b) => b.votes - a.votes)
    }else {
        
        listAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)
    }

    return (
        <div>
            {listAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => Vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filtro: state.filtro
    }
}

const mapDispatchToProps = {
    incrementVote,
    addMessage
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdotesList)
export default ConnectedAnecdotes
