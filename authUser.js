const { func } = require('@hapi/joi');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers.authtoken;
    if (!token) {
        return res.send({
            resultCode: 1,
            messages: [],
            data: {
                userId: null,
                name: null
            }
        })
    } else if (token) {
        let tokenPayload = token.split('.')[1];
        let decoded = JSON.parse(Buffer.from(tokenPayload,
            'base64').toString('ascii'));
        User.findById(decoded._id, function (err, docs) {
            res.send({
                resultCode: 0,
                messages: [],
                data: {
                    userId: docs._id,
                    name: docs.name
                }
            })
        });
    }
    next();
}