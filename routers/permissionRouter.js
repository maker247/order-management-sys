const express = require("express")

const { authenticate } = require("../middlewares/authMiddleware")

const {
    index,
    show
} = require("../controllers/permissionController")

const router = express.Router()

router.get("/", authenticate, index)

router.get("/:uuid", authenticate, show)

module.exports = { permissionRouter: router }