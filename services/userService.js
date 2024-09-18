const {
    getUsers,
    getUser,
    getUserById,
    getUserByEmail,
    storeUser,
    updateUser,
    deleteUser
} = require("../libs/baseQuery/userBaseQuery")

const { getRole } = require("../libs/baseQuery/roleBaseQuery")

const bcrypt = require("bcrypt")

exports.getUsers = async () => {
    return await getUsers()
}

exports.getUser = async (uuid) => {
    return await getUser(uuid)
}

exports.getUserByEmail = async (email, incPwd = false) => {
    return await getUserByEmail(email, incPwd)
}

exports.storeUser = async (data) => {

    const role = await getRole(data.roleUuid)

    data.roleId = role.id

    data.password = await bcrypt.hash(data.password, 10)

    delete data.roleUuid

    return await storeUser(data)
}

exports.updateUser = async (uuid, data) => {
    if(data.roleUuid) {
        const role = await getRole(data.roleUuid)

        data.roleId = role.id

        delete data.roleUuid
    }

    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10)
    }

    return await updateUser(uuid, data)
}

exports.deleteUser = async (uuid) => {
    return await deleteUser(uuid)
}