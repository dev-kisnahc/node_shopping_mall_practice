const express = require('express')
const logger = require("morgan")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const config = require("./config/dev")
const app = express()


// database connect

const dbAddress = (config.mongoURI)

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose
    .connect(dbAddress, dbOptions)
    .then(() => console.log("database connected ...."))
    .catch(err => console.log(err))



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const userRoute = require('./routes/user')


// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// routing
app.use('/product', productRoute)
app.use('/order', orderRoute)
app.use('/user', userRoute)




const PORT = 5000

app.listen(PORT, () => console.log('server started'))

