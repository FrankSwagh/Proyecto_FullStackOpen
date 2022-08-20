/*eslint linebreak-style: ["error", "windows"]*/
import LoginService from '../services/login'
import blogService from '../services/blogs'


const usersReducer = (state = null, action) => {
    //console.log('accion users', action)
    //console.log('estado users', state)
    switch (action.type) {
    case 'READ_LOCAL':
        return action.data
    case 'LOGOUT':
        return state = null
    default:
        return state
    }
}

export const Loggin = (content) => {
    return async (dispatch) => {
        try {
            const user = await LoginService.Login({
                username: content.username,
                password: content.password
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: 'READ_LOCAL', data: user
            })
        } catch( exception ){
            return console.log( exception)
        }
    }
}

export const setUser = (content) => {
    return async dispatch => {
        try{
            dispatch({
                type: 'READ_LOCAL',
                data: { name: content.name, username: content.username, token: content.token }
            })
        }
        catch(e){
            return null
        }
    }
}

export const Logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export default usersReducer
