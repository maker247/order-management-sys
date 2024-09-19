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
    const data = await getRoles()

    res.json({
        success: true,
        data
    })
})

exports.show = asyncHandler(async (req, res) => {
    const { uuid } = req.params

    const data = await getRoleByUuid(uuid)

    res.json({
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

    const data = await storeRole(validated)
    
    res.status(201)
        .json({
            success: true,
            data
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

