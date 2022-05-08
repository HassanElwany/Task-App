const mongoose = require('mongoose')
const validator = require ('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error ('Email is invalid ')
            }
        }
    },
     age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error ('Age must being an integer number ')
            }
        }
    }, password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length <= 6 || value.toLowerCase().includes("password")) {
                throw new Error ('password is not valid')
            }
        }
    }
})

module.exports = User