const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Nexmo = require('nexmo');
const path = require('path')
require('dotenv').config({path:require('find-config')('env')})


const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
  }, {debug:true});


const verify = (req, res, next) =>{
    req.checkBody('PhoneNo', 'PhoneNo is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.json({
            message:errors
        });
        return;
    }

    //req.checkBody('PhoneNo', 'PhoneNo is required').isNumber();
    const PhoneNo = req.body.PhoneNo;
    nexmo.verify.request({
        number: PhoneNo,
        brand: process.env.NEXMO_BRAND_NAME,
        code_length: '6'
      }, (err, result) => {
        //console.log(err ? err : result)
        if(err){
            res.json({
                message:err
            });
        }else{
            let token = jwt.sign({VerifiedPhoneNo:PhoneNo}, process.env.PRESESSION_SECRET_PHONE, {expiresIn: '1h'})
            res.json({
                token:token,
                result:result,
                message: "success"
            });
        }
      });
}

const check = (req, res, next) =>{
    req.checkBody('code', 'Code is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.json({
            errors:errors
        });
        return;
    }

    const code = req.body.code;
    const request_id = req.body.request_id;
    const VerifiedPhoneNo = req.VerifiedPhoneNo;
    nexmo.verify.check({
        request_id: request_id,
        code: code
      }, (err, result) => {     
        console.log(err ? err : result)
        if(err){
            res.json({
                message:err
            });
        }else{
            let token = jwt.sign({VerifiedPhoneNo:VerifiedPhoneNo}, process.env.PRESESSION_SECRET, {expiresIn: '1h'})
            res.json({
                token:token,
                message:"success"
            });
        }
      });
}

const cancel = (req, res, next) =>{
    req.checkBody('request_id', 'Code is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.json({
            message:errors
        });
        return;
    }

    const request_id = req.body.request_id;
    nexmo.verify.control({
        request_id: request_id,
        cmd: 'cancel'
      }, (err, result) => {
        console.log(err ? err : result)
        if(err){
            res.json({
                message:err
            });
        }else{
            res.json({
                result,
                message:"success"
            });
        }
      });
}

const register = (req, res, next) =>{
    req.checkBody('Username', 'UserName is required').notEmpty();
    req.checkBody('Email', 'Email is not valid').isEmail();
    req.checkBody('Password', 'Password is required').notEmpty();
    req.checkBody('Password', 'Password field must be 5 character long').isLength({ min: 5, max:20});
    req.checkBody('PhoneNo', 'PhoneNo is required').notEmpty();
    //req.checkBody('PhoneNo', 'PhoneNo is required').isNumber();

    var errors = req.validationErrors();

    if(errors){
        res.json({
            message:errors
        });
        return;
    }

    console.log(req.VerifiedPhoneNo)
    console.log(req.body.PhoneNo)
    if(req.VerifiedPhoneNo != req.body.PhoneNo){
        res.json({
            message:"Your phone does not match the verified one"
        });
        return;
    }
    
    bcrypt.hash(req.body.Password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                message: err
            })
        } else{
            var Username = req.body.Username;
            var Email = req.body.Email;
            var PhoneNo = req.body.PhoneNo;

            let newUser = new User({
                Username : Username,
                Password : hashedPass,
                Email : Email,
                PhoneNo : PhoneNo
            });

            User.getUserByUsername(Username, function(err, user){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(user){
                    res.json({
                        message: "Username already exisits. Please choose a new one"
                    })
                }else{
                    newUser.save()
                    let token = jwt.sign({_id:newUser._id}, process.env.SESSION_SECRET, {expiresIn: '24h'})
                    res.json({
                        message: "Success",
                        token: token
                    }) 
                }
            })    
        
    }
    })
}

const login = (req, res, next) => {
    var username = req.body.Username
    var password = req.body.Password

    User.findOne({Username : username})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.Password, function(err, result){
                if(err){
                    res.json({
                        message:err
                    })
                }
                if(result){
                    if(user.Privilege){
                        let token = jwt.sign({_id:user._id}, process.env.SESSION_SECRET_ADMIN, {expiresIn: '5h'})
                        res.json({
                            message: "Welcome mighty Admin",
                            token: token
                        })
                    }else{
                        let token = jwt.sign({_id:user._id}, process.env.SESSION_SECRET, {expiresIn: '24h'})
                        res.json({
                            message: "Login successfully",
                            token: token
                        })
                    }
                    
                }else{
                    res.json({
                        message: "Username or Password does not match!"
                    })
                }
            })
        }else{
            res.json({
                message: "Username or Password does not match!"
            })
        }
    })

}



module.exports = {
    register,
    login,
    verify,
    check,
    cancel
}