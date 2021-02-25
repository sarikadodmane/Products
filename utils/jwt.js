const jwt = require('jsonwebtoken')
const secretKey = ''

exports.createJwt = (email, user_id, duration) => {
        const payload = {
        email, user_id, duration
    }
    return jwt.sign(payload, secretKey, { expiresIn: Math.floor(Date.now() / 1000) + duration })
}

exports.validate = function (app) {

    app.use(function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, async function (err, decoded) {
                if (err) {
                   console.log(err, "Failed to authenticate token")
                    res.status(401).json({ error: 'Failed to authenticate token.' })
                } else {
                    next();
                }
            });
        } else {
            console.log({ error: "Failed to authenticate token." }, "JWT login")
            res.status(401).json({ error: 'Failed to authenticate token.' })
        }
    });
};