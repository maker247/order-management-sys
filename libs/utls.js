const {matchedData} = require("express-validator")

exports.invalidateRes = (res, errors) => {
    return res
        .status(400)
        .json({
            success: false,
            errors: errors.array()
        })
}

exports.validatedReq = (req) => {
    return matchedData(req, {locations: ['body']})
}