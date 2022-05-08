const mongoose = require('mongoose')
const validator = require ('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

// const me = new User({
//     name: 'Hassan Mohamed Elwany',
//     email: 'hassan.Elwany198@GMAIL.COM    ',
//      age: 34,
//      password: '123passwor'
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((err)=>{
//     console.log('Error!', err)
// })

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    }, completed: {
        type: Boolean,
        default: false
    }
})

const task = new Tasks({
    description: 'hjkebv',
    completed: true
})
task.save().then(()=>{
    console.log(task)
}).catch((err)=>{
    console.log(`Error!:`, err)
})