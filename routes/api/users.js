const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config  = require('config');
const jwt = require('jsonwebtoken');

//user Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', async(req, res) => {
    User.find({})
    .populate('lists')
    .exec((err, users ) => {
        if(err) throw console.log(err);
        res.json(users);
    });
});

// @route POST api/users
// @desc register a new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, phone } = req.body;

    if(!name || !email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'});
        const newUser = new User({
            name, email, password, phone
        });

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
                        { expiresIn: 86400 }, 
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    phone: user.phone
                                }
                            });

                        } //End of err,token call 
                    )
                });
            })
        });
    });
});

module.exports = router;