/* eslint-disable no-case-declarations */
/*eslint linebreak-style: ["error", "windows"]*/
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'ADDNEW':
        return [...state, action.data]
    case 'LIKE':
        const updateBlog = state.filter(
            (blog) => blog.id !== action.data.id
        )
        return updateBlog.concat(action.data)
    case 'DELETE':
        return state.filter((blog) => blog.id !== action.data)
    case 'ADDCOMMENT':
        return state.map((blog) =>
            blog.id === action.data.blog.id ? action.data.blog : blog
        )
    default:
        return state
    }
}

export const initialBlogs = () => {
    return async (dispatch) => {
        try {
            const blog = await blogService.getAll()
            dispatch({ type: 'INIT_BLOGS', data: blog })
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const AgregarBlog = (blogs) => {
    return async (dispatch) => {
        const content = await blogService.create(blogs)
        dispatch({ type: 'ADDNEW', data: content })
    }
}

export const addLike = (blog) => {
    return async (dispatch) => {
        const liked = await blogService.update({
            ...blog,
            likes: blog.likes + 1
        })
        console.log(liked)
        dispatch({
            type: 'LIKE',
            data: liked
        })
    }
}

export const BorrarBlog = (id) => {
    return async (dispatch) => {
        await blogService.borrar(id)
        dispatch({
            type: 'DELETE',
            data: id
        })
    }
}

export const addComment = (id, comment) => {
    return async (dispatch) => {
        const blog = await blogService.addComment(id, comment)
        dispatch({
            type: 'ADDCOMMENT',
            data: { blog }
        })
    }
}

export default blogReducer
