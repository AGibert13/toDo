const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


let userSchema = new mongoose.Schema('User', {
    email:{},
    password:{},
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            require: true
        }
    }]
})

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}
userSchema.methods.generateAuthToken = function(){

}

userSchema.methods.removeToken = function(){

}
//add methods to instance itself
userSchema.statics.findByToken = function(token){

}

userSchema.statics.findByCredentials = function(email, password){

}

//middleware
userSchema.pre('save', function(next){
    let user = this;
});

let User = mongoose.model('User', userSchema, 'Users');

module.exports ={
    User
}