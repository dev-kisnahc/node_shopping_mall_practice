const express = require('express')

const router = express.Router()


const checkAuth = require("../middleware/check-auth")


const {
    products_get_product,
    products_get_detail,
    products_post_product,
    products_delete_product,
    products_delete_detail,
    products_update_product
} = require('../controllers/product')

// Data Create -Read/Retrive - Update - Delete
//product create API
router.post('/',checkAuth, products_post_product)

//product read API
router.get('/', products_get_product)

// product detail get API
router.get('/:productID', checkAuth, products_get_detail)



//product update API
router.patch('/:productID',checkAuth, products_update_product)


//product delete API
router.delete('/',checkAuth, products_delete_product)

router.delete('/:productID',checkAuth, products_delete_detail)




module.exports = router



