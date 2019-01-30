/**
 * Created by user on 4/4/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//signup Schema
var userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    department:{
        type:String,
        required:false
    },
    active:{
        type:Boolean,
        default:false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User',userSchema,'user');
module.exports = User;