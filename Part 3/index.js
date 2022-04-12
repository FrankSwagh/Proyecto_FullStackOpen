const { request, response } = require("express");
const express = require("express");
const app = express();
var morgan = require('morgan')

let persons = [
  {
    id: 1,
    name: "Pancho Baredas",
    number: "555-348417",
  },
  {
    id: 2,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 3,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 4,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 5,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    "id": 6,
    "name": "pancho",
    "number": "123"
  },
  {
    "id": 7,
    "name": "fran",
    "number": "1234567"
  }
  
];

app.use(express.json())
//app.use(morgan('tiny', {}))
app.use(morgan(function (tokens, req, res) {
  return[
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.valores(req, res)
  ].join(' ')
}))

app.post("/api/persons", (request, response) => {
  if(!request.body.name || !request.body.number){
    return response.status(400).json({error: 'Name or/and number are missing'}) 
  }else if(persons.includes(pers => pers.name === request.body.name)){
    return response.status(400).json({error: 'Name must be unique'}) 
  }else{
    const persona = {
      name: request.body.name,
      number: request.body.number,
      id: Math.floor(Math.random() * (500 - 1)) + 1
    }
    morgan.token('valores', function() {return [`{"name": ${request.body.name}, "number": ${request.body.number} }`]})
    response.json(persona)
  }
})

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(persona => persona.id !== id)
  response.status(204).end()
})

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/5", (request, response) => {
  const person = persons.find(persona => persona.id === 5)
  response.json(person);
});

app.get("/info", (request, response) => {
  const indice = persons.length;
  const hora = new Date()
  response.send(`<div><p>Phonebook has info  for ${indice} people</p>
  <p>${hora} </p></div>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
