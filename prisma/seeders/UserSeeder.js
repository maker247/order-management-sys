const {PrismaClient} = require("@prisma/client")

const {faker} = require("@faker-js/faker")

const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function seedUsers() {
    const password = await bcrypt.hash("password", 10)

    console.log("User seeder started...")

    for(let i = 0; i < 10; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const name = `${firstName} ${lastName}`

        const email = faker.internet.email()

        const roleId = 1

        await prisma.user.upsert({
            where: {email},
            update: {},
            create: {
                name,
                email,
                roleId,
                password
            }
        })
    }

    console.log("User Seeding done.")
}

module.exports = {seedUsers}