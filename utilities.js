module.exports.ExpressError = class ExpressError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports.wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}