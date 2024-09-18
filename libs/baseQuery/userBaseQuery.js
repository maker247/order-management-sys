const prisma = require("../prismaClient")

const user = prisma.user

exports.getUsers = async () => {
    return await user.findMany({
        select: {
            uuid: true,
            name: true,
            email: true,
            role: {
                select: {
                    uuid: true,
                    name: true
                }
            }
        }
    })
}

exports.getUser = async (uuid) => {
    return await user.findUnique({ 
        where: { uuid },
        select: {
            uuid: true,
            name: true,
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

exports.getUserByEmail = async (email, incPwd = false) => {
    return await user.findFirst({
        where: { email },
        select: {
            uuid: true,
            name: true,
            email: true,
            password: incPwd,
            role: {
                select: {
                    uuid: true,
                    name: true,
                    permissions: {
                        select: {
                            permission: true
                        }
                    }
                }
            }
        }
    })
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