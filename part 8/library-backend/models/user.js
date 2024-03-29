const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true,
        minlength: 3
    }
})


module.exports = mongoose.model('User', userSchema)