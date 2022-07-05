const filterReducer = (state = [], action) => {
    switch (action.type) {
        case 'FILTER':
            return action.content
        default:
            break
    }
    return state
}

export const filterAnecdotes = (content) => {
    return {
        type: 'FILTER',
        content: content
    }
}

export default filterReducer
