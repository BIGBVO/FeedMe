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

const FoodSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        default: null
    },
    Icon_path: {
        type: String,
        required: true,
        default: null
    },
    Barcode: {
        type: Number,
        required: true,
        default: null
    },
    Nutritions: {
        type: Array,
        default: [],
        required: false
    }
})

FoodSchema.plugin(autoIncrement.plugin, 'Food')

module.exports = mongoose.model('Food', FoodSchema);


