const express = require('express')

const router = express.Router()

router.post('/',(req, res)=>{
    res.json({
        msg: 'order create API'
    })
})
router.patch('/',(req, res)=>{
    res.json({
        msg: 'order update API'
    })
})
router.get('/', (req, res)=>{
    res.json({
        msg: 'order read API'
    })
})
router.delete('/', (req, res)=>{
    res.json({
        msg: 'order delete API'
    })
})





module.exports = router
