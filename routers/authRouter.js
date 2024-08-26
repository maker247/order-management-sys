const express = require("express")

const {
    register,
    login,
    forgetPassword
} = require("../controllers/authController")

const {
    registerReq,
    loginReq,
    forgetPasswordReq
} = require("../requests/authRequest")

const router = express.Router()

router.post("/login", loginReq(), login)

router.post("/register", )

router.post("/forget-password")

module.exports = {
    authRouter: router
}