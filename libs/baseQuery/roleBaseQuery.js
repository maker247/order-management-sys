const prisma = require("../prismaClient")

const role = prisma.role

exports.getRoles = async () => await role.findMany()

exports.getRoleById = async (id) => {
    return await role.findUnique({
        where: {id: Number(id)}
    })
}

exports.getRole = async (uuid) => {
    return await role.findUnique({
        where: {uuid}
    })
}

exports.getRoleByName = async (name) => {
    return await role.findUnique({
        where: {name}
    })
}

exports.storeRole = async (data) => {
    return await role.create({
        data
    })
}

exports.updateRole = async (uuid, data) => {
    return await role.update({
        data,
        where: { uuid }
    })
}

exports.deleteRole = async (uuid) => {
    return await role.delete({
        where: {uuid}
    })
}