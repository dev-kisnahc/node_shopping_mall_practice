const express = require('express')

const app = express()

app.use((req, res) =>{
     res.json({
         msg : 'seccessful data'
     })
})

const PORT = 5000

app.listen(PORT, () => console.log('server started'))

