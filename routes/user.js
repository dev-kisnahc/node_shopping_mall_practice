const express = require("express")
const bcrypt = require("bcryptjs")

const router = express.Router()

const userModel = require("../models/user")

// 회원가입 API

router.post('/register', (req, res) => {

    bcrypt.hash(req.body.userpassword, 10, (err, hash) => {
            if(err) {
                return res.json({
                    msg: err.message
                })

            }
            else {
                // db saveed
                const newUser = new userModel({
                    name: req.body.username,
                    email: req.body.useremail,
                    password: hash,
                    birth: req.body.userbirth



                })

                newUser
                    .save()
                    .then(user => {
                        console.log("-----", user)
                        res.json({
                            msg: "saved user",
                            userInfo: user
                        })
                    })
                    .catch(err => {
                        res.json({
                            msg: err.message
                        })
                    })
            }
        })



})

// Log-in API

router.post('/login', (req, res) => {

})

module.exports = router