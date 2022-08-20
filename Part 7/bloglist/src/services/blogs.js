/*eslint linebreak-style: ["error", "windows"]*/
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const destroyToken = () => {
    token = null
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (content) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(
        `${baseUrl}/${content.id}`,
        content,
        config
    )
    return response.data
}

const borrar = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const addComment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, {
        comments: comment
    })
    return response.data
}

const exportados = {
    getAll,
    create,
    setToken,
    update,
    borrar,
    destroyToken,
    addComment
}

export default exportados
