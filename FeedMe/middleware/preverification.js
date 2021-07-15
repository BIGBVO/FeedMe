const jwt = require('jsonwebtoken')
require('dotenv').config({path:require('find-config')('env')})

const preverification = (req, res, next) => {
    try{

        ///using Bearer Token
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.PRESESSION_SECRET)

        req.VerifiedPhoneNo = decode.VerifiedPhoneNo
        next()
    }
    
    catch(error){
        res.sendStatus(403)
    }
}

module.exports = preverification