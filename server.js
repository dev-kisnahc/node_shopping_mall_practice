const express = require('express')
const logger = require("morgan")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

const app = express()


// database connect

const dbAddress = "mongodb+srv://kisnahc:rkdcks12@cluster0.kck9d.mongodb.net/shoppingmall?retryWrites=true&w=majority"

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbAddress, dbOptions)
    .then(() => console.log("database connected ...."))
    .catch(err => console.log(err))



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')


// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// routing
app.use('/product', productRoute)
app.use('/order', orderRoute)





const PORT = 5000

app.listen(PORT, () => console.log('server started'))

