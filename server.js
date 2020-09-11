const express = require('express')

const app = express()

const productRoute = require('./routes/product')


// app.use((req, res) =>{
//      res.json({
//          msg : 'seccessful data'
//      })
// })

app.use('/product', productRoute)





const PORT = 5000

app.listen(PORT, () => console.log('server started'))

