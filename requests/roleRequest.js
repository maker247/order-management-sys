const {
    body
} = require("express-validator")

const {
    getRoleByName
} = require("../services/roleService")

exports.createRoleReq = () => ([
    body('name')
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage("name must be between 5 and 255 characters.")
        .custom(async (name) => {
            const role = await getRoleByName(name)

            if(role) throw new Error("role already exists.")
        })
])

exports.updateRoleReq = () => ([
    body('name')
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage("name must be between 5 and 255 characters.")
        .custom(async (name, { req }) => {
            const role = await getRoleByName(name)

            const { uuid } = req.params

            if(role && role.uuid !== uuid) throw new Error("role already exists.")
        })
])