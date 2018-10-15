require('./config/config');

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const _ = require('lodash');
const {
    ObjectID
} = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const {
    toDo
} = require('../server/models/todo');


let app = express();
let port = process.env.PORT || 3000

app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.get('/todos', (req, res) => {
    toDo.find().then((todos) => {
        res.status(200).send({
            todos
        })
    });
}, (error) => {
    res.status(400).send(error)
});



// app.use((req, res, next)=>{
//     res.render('../../index.hbs')
// })
app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.use(express.static(__dirname + '/../..'));
app.use(express.static(path.resolve('/../..')));

app.post('/todos', (req, res) => {
    // console.log(req.body);
    let task = new toDo({
        description: req.body.description,
        employee: req.body.employee,
        end: req.body.end,
        idNum:req.body.idNum,
        start: req.body.start,
        task: req.body.task,
        timestamp: req.body.timestamp
    });

    task.save().then((doc) => {
        res.status(200).send(doc);
    }, (error) => {
        res.status(400).send(error)
    })
});

app.delete('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if (isNaN(todoId)) {
        return res.status(400).send("Invalid ID");
    }
    toDo.findOneAndDelete({idNum:todoId}).then((todoDeleted) => {
        if (!todoDeleted) {
            return res.status(404).send('ID not found');
        }
        res.status(200).send({
            todoDeleted,
            success: 'YES'
        })

    }).catch((error) => {
        res.status(400).send(error);;
    });
});

app.patch('/todos/:id', (req, res)=>{
    let todoId = req.params.id;
    // console.log(toDo.find({id: todoId}));
    let body = _.pick(req.body, ['description','employee','end','idNum','start','task','timestamp','completed']);

    if(isNaN(todoId)){
        return res.status(400).send('Invalid ID');
    };
    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }
    toDo.findOneAndUpdate({idNum: todoId}, {$set: body}, {new:true}).then((updatedTodo)=>{
        if(!updatedTodo){
             return res.status(404).send('ID not found');
        }
        // console.log(updatedTodo)
        res.status(200).send(updatedTodo);    
    }).catch((error)=>{
        res.status(400).send(error);
    });
    
    
    // toDo.findByIdAndUpdate(todoId, {$set: body}, {new:true})
});

app.listen(port, () => console.log(`stared on port: ${port}`));

module.exports = {
    app
};