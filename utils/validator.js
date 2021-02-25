const email_validator = require('email-validator')

exports.validateEmail = (email)=>{
    return email_validator.validate(email)
}