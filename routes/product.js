const express = require('express')

const router = express.Router()

const productModel = require('../models/product')

// Data Create -Read/Retrive - Update - Delete
//product create API
router.post('/',(req, res) => {
    // const newProduct = {
    //     name: req.body.productname,
    //     price: req.body.productprice
    // }
    //
    // res.json({
    //     msg: 'product create API',
    //     productinfo: newProduct
    // })

    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                msg: "saved product",
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

//product read API
router.get('/', (req, res)=>{

    productModel
        .find()
        .then(docs => {
            res.json({
                msg: "total get products",
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

// product detail get API
router.get('/:productID', (req, res)=>{
    const id = req.params.productID

    productModel
        .findById(id)
        .then(doc => {
            res.json({
                msg: 'succssful get product by '+id,
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
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
