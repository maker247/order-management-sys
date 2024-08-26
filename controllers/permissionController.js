const {
    validationResult
} = require("express-validator")

const asyncHandler = require("express-async-handler")

const {
    getPermissions,
    getPermission
} = require("../services/permissionService")

const index = asyncHandler (async (req, res) => {
    res.status(200)
        .json({
            success: true,
            data: getPermissions()
        })
})

// const show = asyncHandler (async (req, res) => {
//     const { uuid } = req.params
// })

// const store = asyncHandler (async (req, res) => {
    
// })

// const update = asyncHandler (async (req, res) => {
//     const { uuid } = req.params
// })

// const destroy = asyncHandler (async (req, res) => {
//     const { uuid } = req.params
// })