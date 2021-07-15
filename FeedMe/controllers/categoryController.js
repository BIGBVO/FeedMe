const Category = require("../models/Category")

const createCategory = function(req, res, next) {
    let categoryName = req.body.Name

    Category.findOne({Name: categoryName}, function(err, cat) {
        if(err) {
            res.statusCode(403)
        }
        if(cat) {
            console.log(cat)
            res.json({
                error: "Category with name " + categoryName + " already exists"
            })
        } else {
            let newCategory = new Category({
                Name: categoryName
            })
            newCategory.save()
                .then(function(response) {
                    res.json({
                        message: "Category " + categoryName + " is successfully created"
                    })
                })
                .catch(function(error) {
                    res.statusCode(403)
                })
        }
    })
}

const show = function(req, res, next) {
    let categoryID = req.body.CategoryID

    Category.findById(categoryID)
        .then(function(response) {
            res.json({
                Category_info: response
            })
        })
        .catch(function(error) {
            res.statusCode(403)
        })
}

const list = function(req, res, next) {
    Category.find()
        .then(function(response) {
            res.json({
                Category_list: response
            })
        })
        .catch(function(error) {
            res.statusCode(403)
        })
}

module.exports = {
    createCategory, show, list
}
