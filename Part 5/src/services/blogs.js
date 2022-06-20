/*eslint linebreak-style: ["error", "windows"]*/
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newInfo) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${id}`, newInfo, config)
    return response.data
}

const borrar = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const exportados = { getAll, create, setToken, update, borrar }

export default  exportados