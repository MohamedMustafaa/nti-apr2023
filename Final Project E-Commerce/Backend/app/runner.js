const express = require("express")
const app = express()
require("../database/connection");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const cors = require("cors");
const path = require("path");
app.use(express.static(path.join(__dirname, '../public/upload')))
app.use(cors())

const userRoutes = require("../routes/user.route")
app.use("/api/user", userRoutes)  //http://localhost:3000/api/user/{user.routes}

const itemRoutes = require("../routes/item.route");
app.use("/api/product", itemRoutes); //http://localhost:3000/api/product/{item.routes}


app.all("*", (req, res)=>{
  res.status(404).send({
    apiStatus: false,
    data: null,
    message: "invalid url"
  })
})

module.exports = app