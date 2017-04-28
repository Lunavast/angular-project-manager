const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../config/database')

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    unique: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.addUser = function(userObject, callback){
  userObject.save(callback)
}

module.exports.deleteUser = function(query, callback){
  User.findOne(query, callback).remove()
}

module.exports.getUser = function(query, callback){
  User.findOne(query, callback)
}

module.exports.getUsers = function(query, callback){
  User.find({}, callback)
}
