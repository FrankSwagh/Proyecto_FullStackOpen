/* eslint-disable jest/require-hook */
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(morgan(':method :url :status - :response-time ms :valores'))
// eslint-disable-next-line no-unused-vars
morgan.token('valores', function (req, res) {
    return [`{"name": ${req.body.name}, "number": ${req.body.number} }`]
})

app.delete('/api/phonebook/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
    const body = request.body

    const pers = {
        name: body.name,
        number: body.number,
    }
    const opts = {
        runValidators: true,
        new: true,
        context: 'query',
    }

    Person.findByIdAndUpdate(request.params.id, pers, opts)
        .then((updatePerson) => {
            response.json(updatePerson)
        })
        .catch((error) => next(error))
})

app.get('/api/phonebook', (request, response) => {
    Person.find({}).then((persona) => {
        response.json(persona)
    })
})

app.get('/api/phonebook/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((pers) => {
            if (pers) {
                response.json(pers)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.post('/api/phonebook', (request, response, next) => {
    if (!request.body.name || !request.body.number) {
        return response
            .status(400)
            .json({ error: 'Name or/and number are missing' })
    }

    const persona = new Person({
        name: request.body.name,
        number: request.body.number,
        id: '',
    })

    Person.findById(request.params.id)
        .then((foundPerson) => {
            console.log('dato', foundPerson)
            if (foundPerson) {
                const opts = {
                    runValidators: true,
                    new: true,
                    context: 'query',
                }
                console.log('encontrado actualizando')
                Person.findByIdAndUpdate(request.params.id, foundPerson, opts)
                    .then((updatePerson) => {
                        response.json(updatePerson)
                    })
                    .catch((error) => next(error))
            } else {
                persona
                    .save()
                    .then((guardarP) => {
                        response.json(guardarP)
                    })
                    .catch((error) => next(error))
            }
        })
        .catch((error) => next(error))

    // eslint-disable-next-line no-unused-vars
    morgan.token('valores', function (req, res) {
        return [`{"name": ${req.body.name}, "number": ${req.body.number} }`]
    })
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
