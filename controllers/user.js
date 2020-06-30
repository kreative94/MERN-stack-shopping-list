const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const config  = require('config');
// const jwt = require('jsonwebtoken');
const userService = require('../services/user.services');
const { comparePassword } = require('../services/user.services');

module.exports.createNewUser = (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'});
        const newUser = new User({
            name, email, password
        });

        userService.hashUserPassword;
    });
};

module.exports.findUserByEmail = (email, callback) => {
    const query = { email: email }
    User.findOne({ query, callback });
}