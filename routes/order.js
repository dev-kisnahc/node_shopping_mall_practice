const express = require('express')

const router = express.Router()

const checkAuth = require("../middleware/check-auth")
const {
    orders_get_order,
    orders_get_detail,
    orders_delete_detail,
    orders_delete_order,
    orders_update_order,
    orders_post_order
} = require("../controllers/order")


router.post('/',checkAuth, orders_post_order)

router.patch('/:orderID',checkAuth, orders_update_order)

router.get('/', orders_get_order)

router.delete('/',checkAuth, orders_delete_order)

router.delete('/:orderID',checkAuth, orders_delete_detail)

router.get('/:orderID',checkAuth, orders_get_detail)





module.exports = router
