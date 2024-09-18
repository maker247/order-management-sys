const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

const { 
    seedPermissions,
    seedRoles
} = require("./RoleSeeder")

const {
    seedUsers
} = require("./UserSeeder")

async function main() {
    try {
        await seedPermissions()

        await seedRoles()

        await seedUsers()
    } catch(e) {
        console.log(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()