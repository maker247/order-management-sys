const asyncHandler = require("express-async-handler")

const { validationResult } = require("express-validator")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const {
    isAuthenticated
} = require("../services/authService")

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

    const user = await getUserByEmail(email, true)

    if(user) {
        const authenticatedUser = isAuthenticated(password, user)

        if(authenticatedUser) {
            res.status(200)
                .json({
                    success: true,
                    data: authenticatedUser
                })
        }
    }

    res.status(400)
        .json({
            success: false,
            message: "something went wrong."
        })
}) 

exports.authCheck = asyncHandler (async (req, res) => {
    res.status(200).json(res.locals.user)
})

exports.forgetPassword = asyncHandler (async (req, res) => {
    res.json({ message: "need to implement." })
})