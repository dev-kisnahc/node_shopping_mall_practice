const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.user_post_register = (req, res) => {
    const {email, password, name, birth} = req.body
    // email 중복체크 => 패스워드 암호화 => db save
    userModel
        .findOne({email})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "이메일이 있습니다. "
                })
            }
            else {

                bcrypt.hash(password, 10, (err, hash) => {
                    if(err) {
                        return res.json({
                            msg: err.message
                        })

                    }
                    else {
                        // db saveed
                        const newUser = new userModel({
                            name,
                            email,
                            password: hash,
                            birth


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




}

exports.user_post_login = (req, res) => {
    //email 유무체크 => password 매칭 => 유저정보 리턴
    const {email, password} = req.body
    userModel
        .findOne({email})
        .then(user => {
            if(!user) {
                return res.json({
                    msg: "not found email"
                })
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err || isMatch === false) {
                        return res.json({
                            msg: "password incorect"
                        })
                    }
                    else {
                        // res.json({
                        //     msg: "succssful login",
                        //     userInfo: user
                        //
                        // })


                        // token 생성
                        const token = jwt.sign(
                            {id: user._id, eamil: user.email},
                            "secret",
                            {expiresIn: "1d"}
                        )
                        res.json({token})


                    }
                })
            }
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
}