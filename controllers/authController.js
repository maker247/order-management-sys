const asyncHandler = require("express-async-handler")

const { validationResult } = require("express-validator")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const {
    getUserByEmail
} = require("../services/userService")

const { invalidateRes, validatedReq } = require("../libs/utls")

exports.register = asyncHandler (async (req, res) => {
    res.json({ message: "need to implement." })
})

exports.login = asyncHandler (async (req, res) => {
    const errors = validationResult(req)

    if(! errors.isEmpty()) {
        return invalidateRes(res, errors)
    }

    const { email, password } = validatedReq(req)

    const user = await getUserByEmail(email)

    if(user) {
        if(bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user, process.env.JWT_SECRET)

            user.token = token

            res.status(200)
                .json({
                    success: true,
                    data: user
                })
            
        }
    }

    res.status(400)
        .json({
            success: false,
            message: "something went wrong."
        })
}) 

exports.forgetPassword = asyncHandler (async (req, res) => {
    res.json({ message: "need to implement." })
})