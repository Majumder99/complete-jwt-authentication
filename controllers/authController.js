const user = require("../model/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//handle errors
const handleError = (err) => {
  //err.code will use to check uniqueness
  console.log(err.message, err.code);
  let error = {
    email: "",
    password: "",
  };

  if (err.code === 1100) {
    error.email = "Email is already exits";
    return error;
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(Object.values(err.errors));
    // The Object.values() method returns an array of a given object's own enumerable property values
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(e.properties);
      error[properties.path] = properties.message;
    });
  }
  // console.log(error);
  return error;
};

const createToken = (id) => {
  // jwt.sign(payload, secret)
  return jwt.sign({ id }, "secretsourav99", { expiresIn: 1 * 60 });
};

module.exports.signup_get = asyncHandler(async (req, res) => {
  res.render("signup");
});
module.exports.signup_post = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.create({
      email,
      password,
    });
    const token = createToken(User._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 600000 });
    console.log(User);
    res.status(201).json({ user: User._id });
  } catch (error) {
    const errors = handleError(error);
    console.log(errors);
    res.status(400).send({ errors });
  }
  // console.log(email, password);
  // res.send("New signup");
});
module.exports.login_get = asyncHandler(async (req, res) => {
  res.render("login");
});
module.exports.login_post = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
  res.send("New login");
});
module.exports.home_get = asyncHandler(async (req, res) => {
  res.render("home");
});
