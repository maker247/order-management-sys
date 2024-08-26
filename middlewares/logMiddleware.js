const logger = require("../libs/logger")

function requestLogger(req, res, next) {
    logger.info(`${req.method} ${req.url} - ip ${req.ip}`)

    next()
}

function errorLogger(err, req, res, next) {
    console.log(err)

    logger.error(`
        ${err.status || 500} - 
        ${err.message} - ${req.origianlUrl} -
        ${req.method} - ${req.ip} \n
        ${err.stack}
    `)

    res.status(err.status || 500)
        .json({
            message: err.message,
            error: process.env.NODE_ENV === 'development' ? err : {}
        })
}

module.exports = {
    requestLogger,
    errorLogger
}