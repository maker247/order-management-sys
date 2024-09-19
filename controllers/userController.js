const asyncHandler = require("express-async-handler")

const {
    validationResult
} = require("express-validator")

const {
    getUsers,
    getUser,
    storeUser,
    updateUser,
    deleteUser
} = require("../services/userService")

const { 
    invalidateRes,
    validatedReq
} = require("../libs/utls")

exports.index = asyncHandler(async (req, res) => {
    const data = await getUsers()

    res.status(200)
        .json({
            success: true,
            data
        })
})

exports.show = asyncHandler(async (req, res) => {
    const { uuid } = req.params

    const data = await getUser(uuid)

    res.status(200)
        .json({
            success: true,
            data
        })
})

exports.store = asyncHandler(async (req, res) => {

    const errors = validationResult(req)

    if(! errors.isEmpty()) {
        return invalidateRes(res, errors)
    }

    const validated = validatedReq(req)

    const user = await storeUser(validated)

    res.status(201)
        .json({
            success: true,
            data: user
        })
})

exports.update = asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if(! errors.isEmpty()) {
        return invalidateRes(res, errors)
    }

    const validated = validatedReq(req)

    const { uuid } = req.params

    await updateUser(uuid, validated)

    res.status(200)
        .json({
            success: true,
            message: "user updated successfully."
        })
})

exports.destroy = asyncHandler(async (req, res) => {
    const { uuid } = req.params

    await deleteUser(uuid)

    res.status(204)
        .json({
            success: true,
            message: "user deleted successfully."
        })
})

