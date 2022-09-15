const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    requried: [true, `Please enter an email`],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    requried: [true, `Please enter a password`],
    unique: true,
    minlength: [8, "Please enter minimum 8 characters"],
    validate: [isStrongPassword, "Please enter strong password"],
  },
});

module.exports = mongoose.model("user", UserSchema);
