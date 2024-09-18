const express = require("express")

const {
    register,
    login,
    authCheck,
    forgetPassword
} = require("../controllers/authController")

const { authenticate } = require("../middlewares/authMiddleware")

const {
    registerReq,
    loginReq,
    forgetPasswordReq
} = require("../requests/authRequest")

const router = express.Router()

router.post("/login", loginReq(), login)

router.post("/authenticate", authenticate, authCheck)

router.post("/register", registerReq(), register)

router.post("/forget-password", forgetPasswordReq(), forgetPassword)

module.exports = {
    authRouter: router
}