/*eslint linebreak-style: ["error", "windows"]*/
const initialState = {
    message: '',
    timeShow: null
}
//########################################## Reducer ##########################################################

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SHOW':
        return {
            message: action.message,
            timeShow: action.time
        }
    case 'CLEAR':
        return {
            message: '',
            timeShow: null
        }
    case 'HIDE':
        clearTimeout(state.timeShow)
        return {
            message: action.message,
            timeShow: action.time
        }

    default:
        return state
    }
}

//########################################## Action creators ##########################################################

export const addMessage = (content, time) => async (dispatch) => {
    const timer = setTimeout(() => {
        dispatch({
            type: 'CLEAR'
        })
    }, time)

    dispatch({
        type: 'HIDE'
    })

    dispatch({
        type: 'SHOW',
        message: content,
        time: timer
    })
}

export default notificationReducer
