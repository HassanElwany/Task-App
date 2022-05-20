const mongoose = require('mongoose')


mongoose.connect(process.env.dataBaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})