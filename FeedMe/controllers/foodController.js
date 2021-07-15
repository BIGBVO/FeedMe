const Food = require("../models/Food")
const Nutrition = require("../models/Nutrition")
const fs = require('fs')

//get the food with barcode
const getFoodByBarcode = (req, res, next) => {
    var barcode = req.params['barcode']
    console.log("barcode is " + barcode)
    Food.findOne({Barcode: barcode}, function(error, food) {
        if(error) {
            res.sendStatus(403)
        }
        if(food){
            res.json({
                _id: food._id,
                Name: food.Name,
                Barcode: food.Barcode,
                Icon_path: food.Icon_path,
                Nutritions: food.Nutritions
            })
        }else{
            res.json({
                error: "Cannot find Food with barcode: " + barcode
            })
        }
    }) 
}

//get all food
const getFood = (req, res, next) => {
    Food.find().then(function(response) {
        res.json({
            response
        })
    }).catch(function(error) {
        res.sendStatus(403)
    })
}

//load icon
const getIcon = function(req, res, next) {
    let uniqueID = req.params.uniqueID
    //try search food with id = uniqueID
    Food.findOne({_id: uniqueID}, function(error, food) {
        if(error) {
            res.sendStatus(403)
        }
        if(food){
            fs.stat(__dirname + "/../" + food.Icon_path, function(err) {
                if(err == null) {
                    res.sendFile(food.Icon_path, { root: "." })
                } else if(err.code === 'ENOENT') {
                    res.sendStatus(404)
                } else {
                    res.sendStatus(403)
                }
            })
            return
        }else{
            //if not found then search food with barcode = uniqueiD
            Food.findOne({Barcode: uniqueID}, function(error, food) {
                if(error) {
                    res.sendStatus(403)
                }
                if(food){
                    fs.stat(__dirname + "/../" + food.Icon_path, function(err) {
                        if(err == null) {
                            res.sendFile(food.Icon_path, { root: "." })
                        } else if(err.code === 'ENOENT') {
                            res.sendStatus(404)
                        } else {
                            res.sendStatus(403)
                        }
                    })
                }else{
                    res.json({
                        error: "Cannot find Food with barcode/id: " + uniqueID
                    })
                }
            })
        }
    }) 
    
}

module.exports = {
    getFood, getFoodByBarcode, getIcon
}