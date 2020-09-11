const express = require('express')

const logger = require("morgan")
const bodyParser = require('body-parser')
const app = express()

const productRoute = require('./routes/product')

const orderRoute = require('./routes/order')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/product', productRoute)
app.use('/order', orderRoute)





const PORT = 5000

app.listen(PORT, () => console.log('server started'))

