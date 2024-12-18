const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 1000;
const userRoutes = require("./routes/users.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User.js");
const mongoose = require("mongoose");
const session = require("express-session");
const listingsRoute = require("./routes/listings.js");
const Listing = require("./models/Listing.js");

app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
let sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log("Origin", req.origin);
  next();
});

app.get("/", (req, res) => {
  console.log("I'm Trigerred");
  res.send("Hello I'm Root");
});

app.use("/", userRoutes);
app.use("/listings", listingsRoute);

app.all((req, res) => {
  res.status(400).send("Page Not Found");
});

app.use((err, req, res, next) => {
  let { message, status = 500 } = err;
  if (message === "invalid signature" || message === "jwt malformed") {
    return res.status(400).send("Invalid Token");
  }
  if (err.message === "Unauthorized") {
    console.log("Hello");
    return res.json({ status: "fail", message: "Please Enter Valid Password" });
  }
  if (
    typeof err.message === "string" &&
    err.message.includes("already registered")
  ) {
    return res
      .status(409)
      .json({
        status: "fail",
        message: "A user with the given username is already registered",
      });
  }
  if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
    return res.status(409).json({
      status: "fail",
      message: "This email is already in use.",
    });
  }
  console.log(err.message);
  console.log(req.body);
  res.status(status).json({ status: "fail", message });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

const clearDB = async () => {
  const res = await Listing.deleteMany({});
  const res2 = await User.deleteMany({});
  console.log(`${(res, res2)}`);
};

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to Database");
  //   clearDB();
}
