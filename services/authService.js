const { validationResult } = require("express-validator")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const {
    getUserByEmail
} = require("../libs/baseQuery/userBaseQuery")

exports.isAuthenticated = async (reqPwd, user) => {
    const comparePwd = await bcrypt.compare(reqPwd, user.password)
    
    if(comparePwd) {
        user.role.permissions = user.role.permissions
                                    .map(rolePermission => rolePermission.permission)        

        const token = jwt.sign(user, process.env.JWT_SECRET)

        user.token = token

        return user
    }

    return false
}