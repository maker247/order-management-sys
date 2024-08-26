const {
    getRoles,
    getRoleById,
    getRoleByName,
    getRole,
    storeRole,
    updateRole,
    deleteRole
} = require("../libs/baseQuery/roleBaseQuery")

const bcrypt = require("bcrypt")

exports.getRoles = async () => {
    return await getRoles()
}

exports.getRoleById = async () => {
    return await getRoleById()
}

exports.getRole = async (uuid) => {
    return await getRole(uuid)
}

exports.getRoleByName = async (name) => {
    return await getRoleByName(name)
}

exports.storeRole = async (data) => {
    return await storeRole(data)
}

exports.updateRole = async (uuid, data) => {
    return await updateRole(uuid, data)
}

exports.deleteRole = async (uuid) => {
    return await deleteRole(uuid)
}