const user = require("../model/User");
const asyncHandler = require("express-async-handler");

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
    console.log(User);
    res.status(201).json(User);
  } catch (error) {
    // console.log(error);
    const errors = handleError(error);
    res.status(400).send({ email: errors.email, password: errors.password });
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
