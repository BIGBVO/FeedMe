
const { Int32 } = require('bson');
const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');


mongoose.connect(
    process.env.DB_CONNECTION,
    {
       useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false
    })

const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database Connection started!')
})

autoIncrement.initialize(db)


const UserScheme = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    PhoneNo: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Privilege: {
        type: Boolean,
        required: true,
        default: false
    },
    RegisterDate: {
        type: String,
        default: Date.now,
        required: true
    },
    Nutrition: {
        type: Array,
        default: [],
        required: false
    }
})

UserScheme.plugin(autoIncrement.plugin, 'User')

module.exports = mongoose.model('Users', UserScheme);

const User = require("../models/User")
module.exports.getUserByUsername = function(Username, callback){
    var query = {Username: Username};
    User.findOne(query, callback);
}

module.exports.getUserByPhoneNo = function(PhoneNo, callback){
    var query = {PhoneNo: PhoneNo};
    User.findOne(query, callback);
}
