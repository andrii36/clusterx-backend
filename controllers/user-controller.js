const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    async registration(req, res, next) {
        //Validate the data
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //Checking if the user is already in database
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.send('Email already exists');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        try {
            const savedUser = await user.save();
            res.send({ userId: user._id, name: user.name });
        } catch (err) {
            res.status(400).send(err)
        }
    }

    async login(req, res, next) {
        //Validate the data
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //Checking if the user is already in database
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.send('Email is wrong');

        //Checking password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Password is wrong');

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('authtoken', token).json({ token: token, name: user.name, userId: user._id });
    }

    async authme(req, res, next) {
        const token = req.headers.authtoken;
        if (!token) {
            return res.send({
                resultCode: 1,
                messages: ['You are not authorized'],
                data: {}
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
    }
}

module.exports = new UserController()