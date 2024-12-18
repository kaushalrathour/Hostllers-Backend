const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("./models/User");

// Utility function to remove spaces from a string
module.exports.removeSpaces = (string) => {
    return string.replace(/\s/g, '');
};


// Function to verify JWT and retrieve user
module.exports.verifyToken = async (token) => {
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(_id);
        if (user) {
            console.log("Verified User: ", user.username);
            return user;
        } else {
            console.log("User not found");
            return null;
        }
    } catch (err) {
        console.log("Token verification failed", err);
        return null;
    }
};

// Function to decode and print JWT token
module.exports.findUser = (token) => {
    try {
        const result = jwt.verify(token, process.env.SECRET);
        console.log(result);
    } catch (err) {
        console.log("Error decoding token", err);
    }
};
