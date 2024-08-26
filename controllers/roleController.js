const asyncHandler = require("express-async-handler")

const {
    validationResult
} = require("express-validator")

const { 
    getRoles,
    storeRole,
    updateRole,
    getRole
} = require("../services/roleService")

const { 
    invalidateRes,
    validatedReq
} = require("../libs/utls")

exports.index = asyncHandler(async (req, res) => {
    res.json(await getRoles())
})

exports.show = asyncHandler(async (req, res) => {
    const { uuid } = req.params

    res.json(await getRoleByUuid(uuid))
})

exports.store = asyncHandler(async (req, res) => {

    const errors = validationResult(req)
    
    if(! errors.isEmpty()) {
        return invalidateRes(res, errors)
    }

    const validated = validatedReq(req)
    
    res.status(201)
        .json({
            success: true,
            data: await storeRole(validated)
        })
})

exports.update = asyncHandler(async (req, res) => {
    const {uuid} = req.params

    const errors = validationResult(req)

    if(! errors.isEmpty()) {
        return invalidateRes(res, errors)
    }

    const validated = validatedReq(req)

    const role = await updateRole(uuid, validated)

    if(! role) return res.json(500).json({ success: false, message: "something went wrong." })

    res.status(200)
        .json({
            success: true,
            message: "role updated successfully."
        })
})

exports.destroy = asyncHandler(async (req, res) => {
    res.send("Not Implemented getRoles")
})

