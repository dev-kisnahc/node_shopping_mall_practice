const express = require("express")
const bcrypt = require("bcryptjs")

const router = express.Router()

const userModel = require("../models/user")

// 회원가입 API

router.post('/register', (req, res) => {

    // email 중복체크 => 패스워드 암호화 => db save
    userModel
        .findOne({email: req.body.useremail})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "이메일이 있습니다. "
                })
            }
            else {

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
            }
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })




})

// Log-in API

router.post('/login', (req, res) => {
    //email 유무체크 => password 매칭 => 유저정보 리턴

    userModel
        .findOne({email: req.body.useremail})
        .then(user => {
            if(!user) {
                return res.json({
                    msg: "not found email"
                })
            }
            else {

            }
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

module.exports = router