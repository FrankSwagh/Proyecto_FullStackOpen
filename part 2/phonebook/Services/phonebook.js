import axios from 'axios'
const serverUrl = 'http://localhost:3001/phonebook'

const getAll = () =>{
    const request = axios.get(serverUrl)
    return request.then(response => response.data)
}

const create = (newInfo) =>{
    const request = axios.post(serverUrl, newInfo)
    return request.then(respose => respose.data)
}

const update = (id, newInfo) =>{
    const request = axios.put(`${serverUrl}/${id}`, newInfo)
    return request.then(respose => respose.data)
}

const borrar = (id) => {
    const request = axios.delete(`${serverUrl}/${id}`)
    return request.then(response => response)
}

export default { getAll, create, update, borrar }

/*{
      "id": 1,
      "name": "Pancho Baredas",
      "number": "555-348417"
    },
    {
      "id": 2,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 3,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 4,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 5,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
    */