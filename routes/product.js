const express = require('express')

const router = express.Router()


// Data Create -Read/Retrive - Update - Delete

//product create API
router.post('/',(req, res)=>{

    const newProduct = {
        name: req.body.productname,
        price: req.body.productprice
    }


    res.json({
        msg: 'product create API',
        productinfo: newProduct
    })
})

//product read API
router.get('/', (req, res)=>{
    res.json({
        msg:'product read API'
    })
})
//product update API
router.patch('/', (req, res)=>{
    res.json({
        msg:'product update API'
    })
})
//product delete API
router.delete('/',(req, res)=>{
    res.json({
        msg:'product delete API'
    })
})






module.exports = router
