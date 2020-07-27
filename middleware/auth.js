const config = require('config');
const env = require('../config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = env;
const secret = JWT_SECRET || config.get('jwtSecret');

function auth(req, res, next) {
    const token  = req.header('x-auth-token');
    
    if(!token) 
        return res.status(401).json({ msg: 'No token, authorization denied'});

    try{
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid.'});
    }
}

module.exports = auth;