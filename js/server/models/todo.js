const mongoose = require('mongoose');

let toDo = mongoose.model('ToDo', {
    description: {
        type: String
    },
    employee: {
        type: String    
    },
    end: {
        type: Number    },
    id:{
        type:Number
    },
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