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
router.post('/', (req, res) => {
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
    });
});

// router.get('/', async(req, res) => {
//     User.findById(req.params.id)
//     .sort({ date: -1 })
//     .populate('item')
//     .then(users => res.json(users))
// });

router.get('/', async(req, res) => {
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
});

module.exports = router;