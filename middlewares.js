const jwt = require("jsonwebtoken");
const {findUser, verifyToken} = require("./helpers.js");
const { ExpressError, wrapAsync } = require("./utilities.js");
const User = require("./models/User.js");
const { existingUserSchema, newUserSchema } = require("./schema.js");
// const protect = (req, res) => {
    
// }

module.exports.doesUserExist = wrapAsync (async(req, res, next)=> {
    const {username} = req.body;
    const user = await User.findOne({username});
    if(!user) {
        console.log("User", user);
        res.status(404).json({status: "fail", message: "User Not Found"});
        return;
    }
    next();
});
module.exports.isLoggedIn = wrapAsync(async (req, res, next) => {
    let token = (req.headers && req.headers["authorization"] || req.headers["Authorization"]) || "No Token";
    if (!token || token.length < 7) {
        throw new ExpressError(400, "Authorization Token is Required");
    }
    token = token.replace(/^Bearer\s+/i, '');
    console.log("Token: ",token);
    const user = await verifyToken(token);
    
    if(!user) {
        console.log("Not User");
        throw new ExpressError(400, "User Not Logged In");
    }
    req.user = user;
     next();
});


module.exports.isBusiness = (req, res, next)=> {
    console.log("Is Business Middleware");
    if(!req.user.isBusiness) {
        throw new ExpressError(400, "Only Businesses Can Add Their Listing");
    }
    next();
}


module.exports.validateNewUser = (req, res, next) => {
    const { username, email, name, role, password } = req.body;
    // console.log("Request Body:", req.body);
    // console.log("username", username);
    // console.log("Type of username:", typeof username);

    const { error, value } = newUserSchema.validate({ username, email, password, name, role });
    if (error) {
        console.error("Validation Error:", error);
        throw new ExpressError(400, error.message);
    }
    return next();
};


module.exports.validateExistingUser = (req, res, next) => {
    const { username, password } = req.body;
    const { error, value } = existingUserSchema.validate({username, password});
    if (error) {
        console.log("Existing Error");
        throw new ExpressError(400, error.message);
    }
    return next();
};
