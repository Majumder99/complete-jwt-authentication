const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    requried: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    requried: true,
    unique: true,
    minLength: 8,
  },
});

module.exports = mongoose.model("user", UserSchema);
