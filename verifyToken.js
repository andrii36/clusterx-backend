const { func } = require('@hapi/joi');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authtoken');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err) {
        res.send({resultCode: 1,
            messages: ['You are not authorized'],
            data: {}
        });
        //res.status(400).send('Invalid Token');
    }
}