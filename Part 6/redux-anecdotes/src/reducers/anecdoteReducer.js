import Services from '../services/anecdotes'

//########################################## Reducer ##########################################################

const reducer = (state = [], action) => {
    //console.log('state now: ', state)
    //console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const actualAnecdotes = state.filter(
                (anecdote) => anecdote.id !== action.data.id
            )
            return actualAnecdotes.concat(action.data)
        case 'ADDNEW':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

//########################################## Action creators ##########################################################
export const incrementVote = (anecdote) => {
    return async (dispatch) => {
        const voted = await Services.updateAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1
        })
        dispatch({
            type: 'VOTE',
            data: voted
        })
    }
}

export const addAnecdote = () => {
    return async (dispatch) => {
        const content = await Services.createNew()
        dispatch({ type: 'ADDNEW', data: content })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdote = await Services.getAll()
        dispatch({ type: 'INIT_ANECDOTES', data: anecdote })
    }
}

export default reducer
