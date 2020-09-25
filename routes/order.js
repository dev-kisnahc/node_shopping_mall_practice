const express = require('express')

const router = express.Router()

const orderModel = require("../models/order")



router.post('/',(req, res)=>{

    const newOrder = new orderModel({
        product: req.body.productid,
        quantity: req.body.qty
    })

    newOrder
        .save()
        .then(doc => {
            res.json({
                msg: "saved order",
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/order/" + doc._id
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

router.patch('/:orderID',(req, res)=>{
    const id = req.params.orderID

    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(() => {
            res.json({
                msg: 'updated at' +id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/order/" +id
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.get('/', (req, res)=>{

    orderModel
        .find()
        .then(docs => {
            if(docs.length === 0){
                res.json({
                    msg: "등록된 오더 없음"
                })
            }
            res.json({
                msg: "total get orders",
                count: docs.length,
                orderInfo: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/order/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                msg:err.message
            })
        })
})

router.delete('/', (req, res)=>{

    orderModel
        .remove()
        .then(doc => {
            res.json({
                msg: "delete orders",
                request: {
                    type: "GET",
                    url: "http://localhost:5000/order/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete('/:orderID', (req, res) => {

    const id = req.params.orderID

    orderModel
        .findByIdAndDelete(id)
        .then(doc => {
            res.json({
                msg: "delete order",
                request: {
                    type: "GET",
                    url: "http://localhost:5000/order/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.get('/:orderID', (req, res) => {

    const id = req.params.orderID

    orderModel
        .findById(id)
        .then(doc => {
            res.json({
                msg: "succssful get order by" +id,
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/order/"
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





module.exports = router
