require("../db/dbConnect")
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()

const myStaticDir = path.join(__dirname, "../resources/public");
const myViewsDir = path.join(__dirname, "../resources/views");
const myPartialDir = path.join(__dirname, "../resources/layouts");

app.use(express.static(myStaticDir));
app.set("view engine", "hbs");
app.set("views", myViewsDir);
hbs.registerPartials(myPartialDir);
app.use(express.urlencoded({ extended: true }));

const taskRoutes = require("./routes/task.routes");
app.use(taskRoutes)


app.all("*", (req, res) =>
  res.render("err404", { pageTitle: "Error in page" })
);
module.exports = app