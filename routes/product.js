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
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/product/" + doc._id
                    }
                }
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
            if(docs.length === 0){
                res.json({
                    msg: '등록된 프로덕트가 없음'
                })
            }
            res.json({
                msg: "total get products",
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/product/" + doc._id
                        }
                    }

                })
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
            if(!doc){
                res.json({
                    msg: "no product id"
                })
            }

            res.json({
                msg: 'succssful get product by '+id,
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/product"
                    }
                }

            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })



})



//product update API
router.patch('/:productID', (req, res)=>{
   const id = req.params.productID

    // 프로덕트모델에서 아이디를 찾고 업데이트내용을 실행
    const updateOps = {}

    // console.log("+++++++++++", req.body)

    for (const ops of req.body) {

        updateOps[ops.propName] = ops.value
        // console.log("----", updateOps)
    }



    productModel
        .findByIdAndUpdate(id, {$set: updateOps })
        .then(() => {
            res.json({
                msg: 'updated at ' +id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/product/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})


//product delete API
router.delete('/',(req, res)=>{

    productModel
        .remove()
        .then(doc => {
            res.json({
                msg: 'delete products',
                request: {
                    type: "GET",
                    url: "http://localhost:5000/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete('/:productID', (req, res)=>{
    const id = req.params.productID

    productModel
        .findByIdAndDelete(id)
        .then(doc => {
            res.json({
                msg: 'delete product',
                request: {
                    type: "GET",
                    url: "http://localhost:5000/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})




module.exports = router
