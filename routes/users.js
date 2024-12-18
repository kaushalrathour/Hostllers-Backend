const express = require("express");
const router = new express.Router();
const userController = require("../controller/users.js");
const { wrapAsync } = require("../utilities.js");
const passport = require("passport");
const { doesUserExist, validateNewUser, validateExistingUser } = require("../middlewares.js");
router.post("/login", validateExistingUser,  doesUserExist, passport.authenticate("local", {failWithError: true ,failureMessage: true }), userController.login);
router.post("/register", validateNewUser, wrapAsync(userController.register));


module.exports = router;