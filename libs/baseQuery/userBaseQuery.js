const bcrypt = require("bcrypt")

const prisma = require("../prismaClient")

const user = prisma.user

exports.getUsers = async () => {
    return await user.findMany({
        select: {
            id: true,
            uuid: true,
            email: true,
            roleId: true,
            role: {
                include: true
            }
        }
    })
}

exports.getUser = async (uuid) => {
    return await user.findUnique({ 
        where: { uuid },
        select: {
            id: true,
            uuid: true,
            email: true,
            roleId: true,
            role: {
                include: true
            }
        }
    })
}

exports.getUserById = async (id) => {
    return await user.findUnique({ where: { id: Number(id) } })
}

exports.getUserByEmail = async (email) => {
    return await user.findUnique({ where: { email } })
}

exports.storeUser = async (data) => {

    return await user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            roleId: Number(data.roleId)
        }
    })
}

exports.updateUser = async (uuid, data) => {
    return await user.update({
        where: { uuid },
        data
    })
}

exports.deleteUser = async (uuid) => {
    return await user.delete({
        where: { uuid }
    })
}