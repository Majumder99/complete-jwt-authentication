const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const bcrypt = require("bcryptjs");

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

//fire a function after doc saved to db
//this is like a eventlistner which will fire after the document is saved into the database
UserSchema.post("save", (doc, next) => {
  console.log("new user ", doc);
  next();
});

//fire a function before document saved to db
//we have used function(){} because we can access to the current instance. we can't do this using arrow function
UserSchema.pre("save", async function (next) {
  // console.log("User about to be created", this);
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
//static method's name is login
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

module.exports = mongoose.model("user", UserSchema);
