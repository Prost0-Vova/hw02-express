const requestError = require('../helpers/reqError')

const validationMiddleware = schema => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body)
        if (error) {
            next(requestError(400, error.message))
        }

        next()
    }

    return func
}

module.exports = validationMiddleware