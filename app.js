const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();

//middlesware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");

//db connection
const URI = "mongodb+srv://root:root@cluster0.yizcs.mongodb.net/node-auth";
mongoose
  .connect(URI)
  .then(() =>
    app.listen(3000, () => {
      console.log("App started to listen at port 3000");
    })
  )
  .catch((e) => console.log(e));

//routes
// app.get("/api", route);
app.use("/", route);
app.get("/smoothies", (req, res) => res.render("smoothies"));

//cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");
//   res.cookie("newUser", false);
//   //secure means that url must have https
//   //httpOnly means we can't access this from the frontend we can access this from the http protocol
//   // res.cookie("newCookies", true, { maxAge: 10 * 20, secure: true });
//   res.cookie("newCookises", true, { maxAge: 20 * 5, httpOnly: true });
//   res.send("You got the cookies");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });
