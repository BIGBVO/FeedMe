const User = require('../models/User')
const Nutrition = require('../models/Nutrition')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


//show the current users

const showProfile = (req, res, next) => {

    var userID = req._id
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })

    .catch(error => {
        res.sendStatus(403)
    })


}

const updatePreferences = (req, res, next) => {
    let userID = req._id
    var thisUser = User.findById(userID)
    .then(response => {
        res.json({
            message: thisUser.Nutrition
        })
    })
    .catch(error => {
        res.sendStatus(403)
    })
}

const addNutrition = function(req, res, next) {

    // UserNutrition.insert(req, res, next)

    let nutritionID = req.body.NutritionID

    if(typeof nutritionID != "number") {
        res.json({
            error: "Wrong Input!"
        })
        return
    }

    User.findOne({"_id": req._id}, function(err, user) {
        if(err) {
            res.sendStatus(403)
            return
        }
        if(user) {
            if(user.Nutrition.indexOf(nutritionID) === -1) {
                user.Nutrition.push(nutritionID)
                user.save()
            } else {
                res.json({
                    error: "Nutrition already exists!"
                })
                return
            }

            res.json({
                message: "Nutrition added successfully!"
            })
        } else {
            res.json({
                error: "Cannot find user"
            })
        }
    })
}

const removeNutrition = function(req, res, next) {

    // UserNutrition.remove(req, res, next)

    let nutritionID = req.body.NutritionID

    if(typeof nutritionID != "number") {
        res.json({
            error: "Wrong Input!"
        })
        return
    }

    User.findOne({"_id": req._id}, function(err, user) {
        if(err) {
            res.sendStatus(403)
            return
        }
        if(user) {
            let index = user.Nutrition.indexOf(nutritionID)
            if(index > -1) {
                user.Nutrition.splice(user.Nutrition.indexOf(nutritionID), 1)
                user.save()
            } else {
                res.json({
                    error: "Not added nutritionID!"
                })
                return
            }

            res.json({
                message: "Nutrition removed successfully!"
            })
        } else {
            res.json({
                error: "Cannot find user!"
            })
        }
    })
}

const listNutritionID = function(req, res, next) {

    User.findOne({"_id": req._id}, function(error, user) {
        if(error) {
            res.sendStatus(403)
        }
        if(user) {
            res.json({
                nutrition_id_list: user.Nutrition
            })
        } else {
            res.json({
                error: "Cannot find user!"
            })
        }
    })
}

const updatePassword = (req, res, next) => {
    req.checkBody('Password', 'Password is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        res.json({
            message:"error here"
        });
        return;
    }

    bcrypt.hash(req.body.Password, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error: err
            })
        }
        let PhoneNo = req.VerifiedPhoneNo
        console.log(PhoneNo)

        User.getUserByPhoneNo(PhoneNo, function(err, user){
            if(err){
                res.json({
                    message: err
                })
            }
            if(user){
                let updatedData = {
                    Password:hashedPass
                }
                console.log(user._id)
                User.findByIdAndUpdate(user._id, {$set:updatedData})
                .then(response => {
                    res.json({
                        message:"Password has been successfully changed!"
                    })
                })
                .catch(error => {
                    res.sendStatus(403)
                })
            }else{
                res.json({
                    message:"Something goes wrong, please try again"
                })
            }

        })
    })
}

const updateEmail = (req, res, next) => {
    
    req.checkBody('Email', 'Email is required').notEmpty();
    req.checkBody('Email', 'Email is not valid').isEmail();
    var errors = req.validationErrors();
    if(errors){
        res.json({
            message:"error here"
        });
        return;
    }

    User.findOne({"_id": req._id}, function(error, user) {
        if(error){
            res.json({
                message: err
            })
        }
        if(user){
            let updatedData = {
                Email:req.body.Email
            }
            User.findByIdAndUpdate(user._id, {$set:updatedData})
            .then(response => {
                res.json({
                    message:"Email has been successfully changed!"
                })
            })
            .catch(error => {
                res.sendStatus(403)
            })
        }else{
            res.json({
                message:"Something goes wrong, please try again"
            })
        }
    })
}


const updatePhoneNo = (req, res, next) => {

    User.findOne({"_id": req.body._id}, function(error, user) {
        if(error){
            res.json({
                message: err
            })
        }
        if(user){
            let updatedData = {
                PhoneNo:req.VerifiedPhoneNo
            }
            User.findByIdAndUpdate(user._id, {$set:updatedData})
            .then(response => {
                res.json({
                    message:"phoneNo has been successfully changed!"
                })
            })
            .catch(error => {
                res.sendStatus(400)
            })
        }else{
            res.json({
                message:"Something goes wrong, please try again"
            })
        }
    })
}

module.exports = {
    showProfile, updatePreferences, addNutrition, removeNutrition, listNutritionID, updatePassword, updateEmail, updatePhoneNo
}
