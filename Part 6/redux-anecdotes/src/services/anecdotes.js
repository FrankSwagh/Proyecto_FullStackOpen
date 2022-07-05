import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote =  async (content) => {
    const request = axios.put(`${baseUrl}/${content.id}`, content)
    const response = await request
    return response.data
}

const exportables = {
    getAll,
    createNew,
    updateAnecdote
}

export default exportables
