const express = require("express")

const {
    index,
    show,
    store,
    update,
    destroy
} = require("../controllers/roleController")

const {
    createRoleReq,
    updateRoleReq
} = require("../requests/roleRequest")

const { authenticate } = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/", authenticate, index)

router.get("/:uuid", authenticate, show)

router.post("/", authenticate, createRoleReq(), store)

router.put("/:uuid", authenticate, updateRoleReq(), update)

router.delete("/:uuid", authenticate, destroy)

module.exports = {
    roleRouter: router
}