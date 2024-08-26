const {
    body
} = require("express-validator")

const { getUser, getUserByEmail } = require("../services/userService")

const { getRole } = require("../services/roleService")

exports.createUserReq = () => ([
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email.")
        .custom(async (email) => {
            
            const user = await getUserByEmail(email)

            if(user) throw new Error("email already exists.")
        }),
    body("name")
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage("name must be between 5 and 255 characters."),
    body("password")
        .isString()
        .isLength({ min: 6, max: 255 })
        .withMessage("password must be at least 6 characters long"),
    body("roleUuid")
        .isString()
        .custom(async (roleUuid) => {
            const role = await getRole(roleUuid)

            if(! role) throw new Error("role doesn't exists.")
        })
])

exports.updateUserReq = () => ([
    body("email")
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email.")
        .custom(async (email, { req }) => {
            
            const user = await getUserByEmail(email)

            const { uuid } = req.params

            if(user && user.uuid !== uuid) throw new Error("email already exists.")
        }),
    body("name")
        .optional()
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage("name must be between 5 and 255 characters."),
    body("password")
        .optional()
        .isString()
        .isLength({ min: 6, max: 255 })
        .withMessage("password must be at least 6 characters long"),
    body("roleUuid")
        .optional()
        .isString()
        .custom(async (roleUuid) => {
            const role = await getRole(roleUuid)

            if(! role) throw new Error("role doesn't exists.")
        })
])