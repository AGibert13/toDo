const express = require('express');
const path = require('path');

let app = express();
let port = process.env.PORT || 4000;

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.use(express.static(__dirname + '/..'));
app.use(express.static(path.resolve('/..')));

app.listen(port);