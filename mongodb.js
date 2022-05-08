//CRUD 

const {MongoClient, ObjectID} = require ('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) =>{
    if(error) {
      return  console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    // db.collection('user').updateOne({
    //   _id: new ObjectID('62462aab2d6fab76b4633afe')
    // }, {
    //     $inc: {
    //       age: 1
    //     }
    // }).then((result)=>{
    //   console.log(result)
    // }).catch((err)=> {
    //   console.log(err)
    // })

    db.collection('user').deleteMany({
      age: 34
    }).then((result) => {
      console.log(result)
    }).catch((err)=>{
      console.log(err)
    })
    


})
