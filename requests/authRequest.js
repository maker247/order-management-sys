const { body } = require("express-validator")

exports.loginReq = () => ([
    body("email")
        .isEmail(),
    body("password")
        .isString()
])

exports.registerReq = () => ([
    body("email")
        .isEmail(),
    body("password")
        .isString(),
    body("passwordComfirmation")
        .isString()
        .custom(async (confirmPassword, {req}) => {
            const { password } = req.body

            if(password !== confirmPassword) throw new Error("password and confirm password did not match.")
        })
])

exports.forgetPasswordReq = () => ([

])