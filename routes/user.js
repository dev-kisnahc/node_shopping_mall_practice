const express = require("express")

const router = express.Router()

const userModel = require("../models/user")
const {
    user_post_register,
    user_post_login
} = require('../controllers/user')



// 회원가입 API

router.post('/register', user_post_register)

// Log-in API

router.post('/login', user_post_login)


module.exports = router