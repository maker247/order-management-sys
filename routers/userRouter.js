const express = require("express")

const {authenticate} = require("../middlewares/authMiddleware")

const {
    index,
    show,
    store,
    update,
    destroy
} = require("../controllers/userController")

const {
    createUserReq,
    updateUserReq
} = require("../requests/userRequest")

const router = express.Router()

router.get("/", authenticate, index)

router.get("/:uuid", authenticate, show)

router.post("/", authenticate, createUserReq(), store)

router.put("/:uuid", authenticate, updateUserReq(), update)

router.delete("/:uuid", authenticate, destroy)

module.exports = {
    userRouter: router
}