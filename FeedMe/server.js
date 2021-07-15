//import the necessary packages
const express = require('express')
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const Nexmo = require('nexmo');

require('dotenv/config')

const AdminRouter = require("./routes/admin")
const AuthRouter = require("./routes/auth")
const UserRouter = require("./routes/user")
const NutritionRouter = require("./routes/nutrition")
const CategoryRouter = require("./routes/category")
const FoodRouter = require("./routes/food")

//execute the package
const app = express()
app.use(expressValidator());



mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false
    })


const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database Connection started!')
})

autoIncrement.initialize(db)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.listen(3000)

app.use("/api/admin", AdminRouter)
app.use("/api", AuthRouter)
app.use("/api/user", UserRouter)
app.use("/api/nutrition", NutritionRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/food", FoodRouter)
