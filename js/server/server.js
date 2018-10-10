const express = require('express');
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const{toDo} = require('../server/models/todo');


let app = express();
let port = process.env.PORT || 3000

// app.use(bodyParser.json());

// app.get('/todos', (req, res)=> {
//     toDo.find().then((todos)=>{
//         res.send({todos})
//     });
// });

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname + '/../../index.html'));
});

app.use(express.static(__dirname + '/../..'));
app.use(express.static(path.resolve('/../..')));

app.listen(port);