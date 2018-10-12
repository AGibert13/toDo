const mongoose = require('mongoose');

let toDo = mongoose.model('ToDo', {
    description: {
        type: String
    },
    employee: {
        type: String    
    },
    end: {
        type: Number},
    
    start:{
        type: String
    },
    task: {
        type: String
    },
    timestamp: {
        type: String
    }

}, "Tasks");

module.exports = {toDo};

// id:{
//     type:Number
// },