const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middlesware
app.use(express.static("public"));

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
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
