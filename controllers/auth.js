const userModel = require('../models/user');
const hashing = require('../utils/bcrypts')
const emailvalidator = require('../utils/validator')
const jwt = require('../utils/jwt')

const PASSWORD_MAX_LENGTH = 45
const PASSWORD_MIN_LENGTH = 8

exports.signup = async (req, res) => {
    let { name, email, password } = req.body;

    const requiredFields = ["name", "email", "passowrd"]
    const missingFields = []

    for (let i in requiredFields) {
        const field = requiredFields[i]
        if (!req.body[field]) {
            missingFields.push(field)
        }
    }

    if (missingFields.length > 0) {
        return res.status(400).send({ error: "following fields are required " + missingFields })
    }

    if (password.length > PASSWORD_MAX_LENGTH || password.length < PASSWORD_MIN_LENGTH) {
        return res.status(400).send({ error: "password length should be minimum 8 characters and maximum 45" })
    }

    if (email) {
        let isValidEmail = await emailvalidator.validateEmail(email)
        if (!isValidEmail) return res.status(400).send({ error: "Please give a valid email id " })
    }

    userModel.findOne({ email: email })
        .then(async userRes => {
            if (userRes) {
                return res.status(400).json({ error: "user already exists" })
            } else {
                const user = new userModel({
                    name: name,
                    email: email,
                    password: password,
                })
                const hashPassowrd = await hashing.hashPassword(password)
                if (hashPassowrd) user.password = hashPassowrd
                user.save()
                    .then(response => {
                        return res.status(200).json({ message: "user created", result: response })
                    }).catch(err => {
                        res.status(500).json({ error: err });
                    })
            }
        }).catch(err => {
            res.status(500).json({ errors: 'Something went wrong' })
        });
}

exports.signin = async (req, res) => {
    let { email, password } = req.body

    if (email) {
        let isValidEmail = await emailvalidator.validateEmail(email)
        if (!isValidEmail) return res.status(400).send({ error: "Please give a valid email id " })
    }

    if (password.length > PASSWORD_MAX_LENGTH || password.length < PASSWORD_MIN_LENGTH) {
        return res.status(400).send({ error: "password length should be minimum 8 characters and maximum 45" })
    }

    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(400).json({ error: "user not found" })
        } else {
            let isvalidPassword = hashing.validatePaswword(password, user.password)
            if (isvalidPassword) {
                const token = jwt.createJwt(email, user.id, 60)  ///60 seconds of validity
                return res.status(200).json({ message: "Login Successfull", token })
            }
        }
    }).catch(err => {
        res.status(500).json({ error: err });
    });

}

exports.getuser = (req, res) => {
    User.find().then(user => {
        if (!user) {
            return res.status(400).json({ error: "user not found" })
        } else {
            return res.status(200).json({ result: user })
        }
    }).catch(err => {
        res.status(500).json({ error: err });
    });
}

exports.updateuser = async (req, res) => {
    User.findOneAndUpdate(
        { name: req.params.name },
        {
            $set: {
                name: req.body.name
            }

        }, options
    ).then(user => {
        return res.status(200).json({ "message": 'Successfull' })
    }).catch(err => {
        res.status(500).json({ error: err });
    });
}

exports.deleteuser = (req, res) => {
    User.deleteOne(
        { name: req.params.id }, options
    ).then(user => {
        return res.status(200).json({ "message": 'Successfull' })
    }).catch(err => {
        res.status(500).json({ error: err });
    });
}