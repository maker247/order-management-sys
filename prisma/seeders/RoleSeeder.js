const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const permissions = [
    // permissions
    { name: 'permission-index' },
    // roles
    { name: 'role-index' },
    { name: 'role-store' },
    { name: 'role-update' },
    { name: 'role-delete' },
    // users
    { name: 'user-index' },
    { name: 'user-store' },
    { name: 'user-update' },
    { name: 'user-delete' }
]

async function seedRoles() {
    console.log("Role seeder started...")

    var role = await prisma.role.findUnique({
        where: { name: "superAdmin" }
    })

    if(! role) var role = await prisma.role.create({ data: { name: "superAdmin" } })

    const permissions = await prisma.permission.findMany()

    permissions.map(async (permission) => {
        const is_exists = await prisma.rolePermission.findUnique({
            where: {
                roleId: Number(role.id),
                permissionId: Number(permission.id)
            }
        })

        if(! is_exists) await prisma.rolePermission.create({
            data: {
                roleId: Number(role.id),
                permissionId: Number(permission.id)
            }
        })
    })

    console.log("Role seeder finished...")
}

async function seedPermissions() {
    console.log("Permission seeder started...")

    permissions.map(async (permission) => {
        const is_pmi_exists = await prisma.permission.findUnique({
            where: { name: permission.name }
        })

        if(! is_pmi_exists) await prisma.permission.create({ data: permission })
    })

    console.log("Permission seeder finished...")
}

module.exports = {
    seedPermissions,
    seedRoles
}