const {
    createLogger,
    format,
    transports
} = require("winston")

const { 
    combine,
    timestamp,
    printf,
    colorize
} = format

const logger = createLogger({
    format: combine(
        colorize(),
        timestamp(),
        printf(({
            timestamp,
            level,
            message
        }) => {
            return `${timestamp} [${level}: ${message}]`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
})

module.exports = logger