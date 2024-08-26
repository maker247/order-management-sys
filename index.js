const express = require("express")

const asyncHandler = require('express-async-handler')

const prisma = require('./libs/prismaClient')

const {
    requestLogger,
    errorLogger
} = require('./middlewares/logMiddleware')

const app = express()

const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

app.use(errorLogger)

// import router
const { userRouter } = require("./routers/userRouter")

const { roleRouter } = require("./routers/roleRouter")

const { authRouter } = require("./routers/authRouter")

// use router
app.use('/', authRouter)

app.use('/users', userRouter)

app.use('/roles', roleRouter)

app.get('/info', asyncHandler(async(req, res) => {
    res.json({ message: "api is working" })
}))



const server = app.listen(process.env.PORT, () => {
    console.log(`server running at port: ${process.env.PORT}`)
})

const gracefulShutdown = async () => {
    await prisma.$disconnect()

    server.close(() => {
        console.log("server has been closed.")

        process.exit(0)
    })
}

process.on("SIGTERM", gracefulShutdown)

process.on("SIGINT", gracefulShutdown)