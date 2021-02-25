const bcryptjs = require('bcryptjs');


exports.hashPassword = (plainText)=>{
    return bcryptjs.hashSync(plainText,10)
}

exports.validatePaswword = (original,hashed)=>{
    return bcryptjs.compareSync(original,hashed)
}