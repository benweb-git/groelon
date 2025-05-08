const jwt = require('jsonwebtoken');

module.exports.createToken = async(data) => {
    //console.log("from createToken",process.env.jt_SECRET)
    const token = await jwt.sign(data,process.env.jt_SECRET,{
        expiresIn : '7d' })
        return token
}

