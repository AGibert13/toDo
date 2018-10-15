const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//bcrypt

let password = "password1";


bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log(hash);
    })
});

let hashedPassword = '$2a$10$8.YKvtPnz6Jg1k1nJFgumOU6Xvbi.5JUdhCfbA/ch6bK/Sj4xZDAO';

bcrypt.compare(password, hashedPassword, (err, result)=>{
    console.log(result)
})

//JWT
// let data = {
//     id: 100
// };

// let token = jwt.sign(data, 'secretValue');
// console.log(token);

// let checkValue = jwt.verify(token, "secretValue");
// console.log(checkValue);

// let myPrivateMessge = "Hello friend";
// let hashedMessage = SHA256(myPrivateMessge);
// console.log(hashedMessage);

let dataToSend = {
    id: 4,
    messsage: 'hello friend',
    completed: true
};

let token = {
    dataToSend,
    hash: SHA256(JSON.stringify(dataToSend) + 'secretValue').toString()
}

//example of attack

token.dataToSend.id = 5;
token.hash = SHA256(JSON.stringify(token.dataToSend)).toString();

let resultHash = SHA256(JSON.stringify(token.dataToSend) + 'secretValue').toString();
console.log(token);
console.log(resultHash);

if(resultHash === token.hash){
    console.log('data wasnt changed');
}
else{
    console.log('data was changed');
}