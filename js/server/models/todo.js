const mongoose = require('mongoose');

let toDo = mongoose.model('ToDo', {
    description: {
        type: String
    },
    employee: {
        type: String    
    },
    end: {
        
    },
    idNum:{
        type: Number
    },
    
    start:{
        type: String
    },
    task: {
        type: String
    },
    timestamp: {
        type: String
    },
    completed:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    },
    // _creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // }

}, "Tasks");

module.exports = {toDo};

// id:{
//     type:Number
// },