const user = require("../model/User");
const asyncHandler = require("express-async-handler");

//handle errors
const handleError = (err) => {
  //err.code will use to check uniqueness
  console.log(err.message, err.code);
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
    handleError(error);
    res.status(400).send({ msg: error.message });
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
