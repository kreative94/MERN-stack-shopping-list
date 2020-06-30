const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Used to compare hashed password for user authentication
module.exports.comparePassword = (req, res) => {
    bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 36000 }, 
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });

                        } //End of err,token call 
                    )
                });
}

module.exports.hashUserPassword = (req, res) => {
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;

            newUser.save()
            .then(user => {
                
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 36000 }, 
                    (err, token) => {
                        if(err) throw err;

                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });

                    } //End of err,token call 
                )
            });
        })
    });
}

module.exports.findUserById = (req,res) => {
    User.findOne({id})
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist'});
        });
}

module.exports.findUserByEmail = (req, res) => {
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'});
    });
}