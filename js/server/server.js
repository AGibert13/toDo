const express = require('express');
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const{toDo} = require('../server/models/todo');


let app = express();
let port = process.env.PORT || 3000

app.use(bodyParser.json());

app.get('/todos', (req, res)=> {
    toDo.find().then((todos)=>{
        res.status(200).send({todos})
    });
}, (error) =>{
    res.status(400).send(error)
});

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname + '/../../index.html'));
});

app.use(express.static(__dirname + '/../..'));
app.use(express.static(path.resolve('/../..')));

app.post('/todos', (req, res)=>{
    // console.log(req.body);
    let task = new toDo({
        description: req.body.description,
        employee: req.body.employee,
        end: req.body.end,
        // id:req.body.id,
        start:req.body.start,
        task: req.body.task,
        timestamp: req.body.timestamp
    });

    task.save().then((doc)=>{
        res.status(200).send(doc);
    }, (error)=>{
        res.status(400).send(error)
    })
});

app.delete('/todos/:_id', (req, res)=>{
    console.log(req.params._id);
    let todoId = req.param.id;

    
});

app.listen(port, () => console.log(`stared on port: ${port}`));

module.exports = {app};