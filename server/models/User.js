const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type : String , required : true, min: 3, max: 20,},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true, min: 6},
    isAdmin : {type : Boolean , required : true},
    avatar : {type : String , required : true},
    created : {type : Date , default : Date.now},
}, { timestamps: true });

const User = mongoose.model('users' , UserSchema);
module.exports = User;