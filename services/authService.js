const { validationResult } = require("express-validator")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const {
    getUserByEmail
} = require("../libs/baseQuery/userBaseQuery")

exports.login = async (email, password) => {
    const user = getUserByEmail(email)

    if(user) {
        if(bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user, process.env.JWT_SECRET)

            
        }
    }
}