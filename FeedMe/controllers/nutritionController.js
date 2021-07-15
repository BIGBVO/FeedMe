const Nutrition = require("../models/Nutrition")
const fs = require('fs')

const listAll = function(req, res, next) {
    Nutrition.find().then(function(response) {
        res.json({
            response
        })
    }).catch(function(error) {
        res.sendStatus(403)
    })
}

const addNutrition = function(req, res, next) {
    let nutrition = new Nutrition({
        Description: req.body.Description,
        Icon_path: req.body.Icon_path,
        CategoryID: req.body.CategoryID
    })
    nutrition.save()
        .then(function(response) {
            res.json({
                message: "Nutrition " + nutrition.Description + " has been created successfully!"
            })
        })
        .catch(function(error) {
            res.sendStatus(403)
        })
}

const update = function(req, res, next) {
    let nutritionID = req.body.NutritionID
    let updatedData = {
        Description: req.body.Description,
        Icon_path: req.body.Icon_path,
        CategoryID: req.body.CategoryID
    }
    Nutrition.findByIdAndUpdate(nutritionID, {$set: updatedData})
        .then(function(response) {
            res.json({
                message: "Nutrition " + updatedData.Description + " has been updated successfully!"
            })
        })
        .catch(function(error) {
            res.sendStatus(403)
        })
}

const removeByID = function(req, res, next) {
    let nutritionID = req.body.NutritionID
    Nutrition.findByIdAndRemove(nutritionID)
        .then(function(response) {
            res.json({
                message: "Nutrition ID: " + nutritionID + " removed successfully!"
            })
        })
        .catch(function(error) {
            res.sendStatus(403)
        })
}

const showNutritionByID = function(req, res, next) {
    let nutritionID = req.query.id
    Nutrition.findOne({_id: nutritionID}, function(error, nutrition) {
        if(error) {
            res.sendStatus(403)
        }
        if(nutrition) {
            res.json({
                NutritionID: nutrition._id,
                Description: nutrition.Description,
                Icon_path: nutrition.Icon_path,
                CategoryID: nutrition.CategoryID
            })
        } else {
            res.json({
                error: "Cannot find Nutrition with ID: " + nutritionID
            })
        }
    })
}

const showNutritionByDescription = function(req, res, next) {
    // let nutritionDesc = req.body.Description
    let nutritionDesc = req.query.description
    Nutrition.getNutritionByDescription(nutritionDesc, function(error, nutrition) {
        if(error) {
            res.sendStatus(403)
        }
        if(nutrition) {
            res.json({
                NutritionID: nutrition._id,
                Description: nutritionDesc,
                Icon_path : nutrition.Icon_path,
                CategoryID: nutrition.CategoryID
            })
        } else {
            res.json({
                error: "Cannot find nutrition with description " + nutritionDesc
            })
        }
    })
}

//why do we request the iconPath from the frontend? we can request them the id of the nutrition instead...
//otherwise the icon path is exposed to the end-user. -commented by Hao

// From the application running progress, the frontend will acknowledge the icon_path when it is trying to retrieve a nutrition object.
// The backend does not have to query the same object twice because the cost of querying the database is expensive.
// If we load icons according to nutrition id, we still need retrieve the nutrition object first, so the operation delay is doubled.
// What do you mean exposing icon path to the end-user? Is it the file may not be found so the error message will expose the image path?
// If so, I think this can be prevented by catching errors by either backend or frontend and choosing not prompt the error messages directly.
// And I handled here to let the database only store the image files' names, rather than the complete relative path. But the controller
// method knows where the icons are located, so they can still be loaded without relative paths passing in.      - commented by Arthur
const loadIcon = function(req, res, next) {
    let iconPath = req.query.path
    let relative_path = "res/preference_icon/" + iconPath
    fs.stat(__dirname + "/../" + location, function(err) {
        if(err == null) {
            res.sendFile(relative_path, { root: "." })
        } else if(err.code === 'ENOENT') {
            res.sendStatus(404)
        } else {
            res.sendStatus(403)
        }
    })
}

const assign = function(req, res, next) {
    let nutritionID = req.body.NutritionID
    let categoryID = req.body.CategoryID

    Nutrition.findOneAndUpdate({_id: nutritionID}, {CategoryID: categoryID})
        .then(function(response) {
            res.json({
                message: "Nutrition is assigned successfully"
            })
        })
        .catch(function(error) {
            res.statusCode(403)
        })
}

const search = function(req, res, next) {
    let keyword = req.query.keyword
    console.log('.*' + keyword + '.*')
    Nutrition.find({Description: { $regex: new RegExp('.*' + keyword.toLowerCase() + '.*', "i")}})
        .then(function(response) {
            res.json({
                results: response
            })
        })
        .catch(function(error) {
            res.statusCode(403)
        })
}

module.exports = {
    listAll, addNutrition, update, showNutritionByDescription, removeByID, showNutritionByID, loadIcon, assign, search
}
