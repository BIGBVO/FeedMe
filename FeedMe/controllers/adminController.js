const { Module } = require('module')
const User = require('../models/User')
const Nutrition = require('../models/Nutrition')
const Food = require('../models/Food')
var mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

//show the list of current users
const index = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.sendStatus(403)
    })
}

//show the current users
const show = (req, res, next) => {
    let userID = req.body.userID
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

//store a new user
const store = (req, res, next) => {
    let user = new User({
        Username : req.body.Username,
        Password : req.body.Password,
        Email : req.body.Email
    })
    user.save()
    .then(response => {
        res.json({
            message: 'User ' + user.Username + " has been created successfully!"
        })
    })
    .catch(error => {
        res.sendStatus(403)
    })
}

//update an user
const update = (req, res, next) => {
    let userID = req.body.userID
    let updatedData = {
        Username : req.body.Username,
        Email : req.body.Email
    }
    User.findByIdAndUpdate(userID, {$set:updatedData})
    .then(response => {
        res.json({
            message: 'User ' + updatedData.Username + "has been updated successfully!"
        })
    })
    .catch(error => {
        res.sendStatus(403)
    })
}

//delete an user
const remove = (req, res, next) => {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
    .then(() => {
        res.json({
            message: "User has been successfully removed"
        })
    })
    .catch(error => {
        res.sendStatus(403)
    })
}

const nutritionController = require('./nutritionController')

//store a new nutrition
const storeNutrition = (req, res, next) => {

    nutritionController.addNutrition(req, res, next)

    // let nutrition = new Nutrition({
    //     Description : req.body.Description
    // })
    // nutrition.save()
    // .then(response => {
    //     res.json({
    //         message: 'nutrition ' + nutrition.Description + " has been created successfully!"
    //     })
    // })
    // .catch(error => {
    //     res.sendStatus(403)
    // })
}

//show the current nutritions
const showNutrition = (req, res, next) => {

    nutritionController.listAll(req, res, next)

    // Nutrition.find()
    // .then(response => {
    //     res.json({
    //         response
    //     })
    // })
    // .catch(error => {
    //     res.sendStatus(403)
    // })
}


//show the current nutritions
const createFood = (req, res, next) => {
    req.checkBody('Name', 'Name is required').notEmpty();
    req.checkBody('Icon_path', 'Icon path is required').notEmpty();
    req.checkBody('Barcode', 'Barcode is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.json({
            message:"error here"
        });
        return;
    }

    let food = new Food({
        Name : req.body.Name,
        Icon_path : req.body.Icon_path,
        Barcode : req.body.Barcode
    })
    food.save()
    .then(response => {
        res.json({
            message: 'food ' + food.Name + " has been created successfully!"
        })
    })
    .catch(error => {
        res.sendStatus(403)
    })   
}

//add nutrition to the food
const addNutritionToFood = (req, res, next) => {
    req.checkBody('foodID', 'food ID is required').notEmpty();
    req.checkBody('nutritionID', 'nutrition ID is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.json({
            message:"error here"
        });
        return;
    }
    let nutritionID = req.body.nutritionID

    if(typeof nutritionID != "number") {
        res.json({
            error: "Wrong Input!"
        })
        return
    }

    Food.findOne({"_id": req.body.foodID}, function(err, food) {
        if(err) {
            res.sendStatus(403)
            return
        }
        if(food) {
            if(food.Nutritions.indexOf(nutritionID) === -1) {
                food.Nutritions.push(nutritionID)
                food.save()
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
                error: "Cannot find food"
            })
        }
    })
    
}

const deleteFoodByID = function(req, res, next) {
    let foodID = req.params.foodID
    Food.findByIdAndRemove(foodID)
        .then(function(response) {
            res.json({
                message: "Food ID: " + foodID + " removed successfully!"
            })
        })
        .catch(function(error) {
            res.sendStatus(403)
        })
}

module.exports = {
    index, show, store, update, remove, storeNutrition, showNutrition, createFood, addNutritionToFood, deleteFoodByID
}
