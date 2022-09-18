const jwt = require("jsonwebtoken");
const user = require("../model/User");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secretsourav99", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check for user
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secretsourav99", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.User = null;
        next();
      } else {
        console.log(decodedToken);
        const obj = decodedToken.id;
        const User = await user.findOne({ obj });
        if (user) {
          res.locals.User = User;
          next();
        } else {
          res.locals.User = null;
          next();
        }
      }
    });
  } else {
    res.locals.User = null;
    next();
  }
};

module.exports = authMiddleware;
module.exports = checkUser;
