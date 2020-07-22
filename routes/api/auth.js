const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST /api/auth
// @desc Auth users
// @access Public
router.post('/', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    } //End

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist'});
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

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
                                    email: user.email
                                }
                            });

                        } //End of err,token call 
                    )
                });
        });
}); 

// router.post('/', authController.authenticateUser); 

// @route GET api/auth/user
// @desc Get current user
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;