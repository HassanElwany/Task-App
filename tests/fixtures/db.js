const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


const userTestId = new mongoose.Types.ObjectId()
const userTest = {
    _id: userTestId,
    name: 'hasan',
    email: 'hassan@exep.com',
    password: 'aliramy123',
    tokens: [{
        token: jwt.sign({_id: userTestId}, process.env.jwtSecret)
    }]
}

const userTestyId = new mongoose.Types.ObjectId()
const userTesty = {
    _id: userTestyId,
    name: 'elwany',
    email: 'hassan@normal.com',
    password: 'aliramy123',
    tokens: [{
        token: jwt.sign({_id: userTestyId}, process.env.jwtSecret)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "first test",
    completed: false,
    owner: userTestId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "second test",
    completed: true,
    owner: userTestyId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "third test",
    completed: true,
    owner: userTesty._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userTest).save()
    await new User(userTesty).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userTest,
    userTestId,
    setupDatabase,
    userTesty,
    userTestyId,
    taskOne,
    taskTwo,
    taskThree
}