/* eslint-disable jest/require-hook */
const mongoose = require('mongoose')

let arreglo = []

process.argv.forEach((val, index) => {
    arreglo.push(val)
})


const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Persons', personSchema)

if (arreglo.length === 3) {
    Person.find({}).then((result) => {
        console.log('Phonebook:')
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (arreglo.length > 3 && arreglo.length < 6) {
    const person = new Person({
        name: arreglo[3],
        number: arreglo[4],
    })

    person.save().then((result) => {
        console.log(`Added ${arreglo[3]}, number ${arreglo[4]} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Error')
    mongoose.connection.close()
}
