const express = require('express');
const path = require('path');

let app = express();

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.use(express.static(__dirname + '/..'));
app.use(express.static(path.resolve('/..')));

app.listen('4000', ()=>{
    console.log('server is running on port 4000!');
})