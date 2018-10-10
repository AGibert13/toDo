const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const{toDo} = require('../server/models/todo');

let id = "5bbd1234cbdc050abd7c2fe9";

// toDo.find({
//     _id: id
// }).then((todo) => {
//     console.log(`todo with ID: ${id}: --- ${todo}`)
// });

// toDo.find().then((docs)=>{
//     console.log(docs)
// })

toDo.findById(id).then(todo => console.log(`todo with ID: ${id}: --- ${todo}`))