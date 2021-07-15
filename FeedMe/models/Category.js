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

const CategorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        default: undefined
    }
})

CategorySchema.plugin(autoIncrement.plugin, 'Category')

module.exports = mongoose.model('Category', CategorySchema);
