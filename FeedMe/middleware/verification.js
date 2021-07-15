const jwt = require('jsonwebtoken')
require('dotenv').config({path:require('find-config')('env')})

const verification = (req, res, next) => {
    try{

        ///using Bearer Token
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SESSION_SECRET)

        req._id = decode._id
        next()
    }
    
    catch(error){

        res.sendStatus(403)
    }
}

module.exports = verification