const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: false
    },
    register_date: {
        type: Date,
        default: Date.now
    }, 
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;