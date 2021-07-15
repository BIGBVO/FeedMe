const { Int32 } = require('bson');
const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false
    })

const db = mongoose.connection

db.on('error', function(err) {
    console.log(err)
})

db.once('open', function() {
    console.log('Database Connection started!')
})

autoIncrement.initialize(db)

const NutritionScheme = new mongoose.Schema({
    Description: {
        type: String,
        required: true,
        default: null
    },
    Icon_path: {
        type: String,
        required: true,
        default: null
    },
    CategoryID: {
        type: Number,
        required: true,
        default: null
    }
})

NutritionScheme.plugin(autoIncrement.plugin, 'Nutrition')

module.exports = mongoose.model('Nutrition', NutritionScheme);

const Nutrition = require("./Nutrition")
module.exports.getNutritionByDescription = function(description, callback) {
    Nutrition.findOne({Description: description}, callback)
}
