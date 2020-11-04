const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 30,
    },
    birth: {
        type: Date
    }

})



module.exports = mongoose.model("user", userSchema)
