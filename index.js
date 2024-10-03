// dependencies
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

const uri = process.env.URI;

// create express app
const app = express();

// server port number
const port = process.env.PORT || 3000;

// json body parser middleware
app.use(express.json());

// database connection by mongoose
mongoose
  .connect(uri)
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log(err));

// todo server root route
app.get("/", (req, res) => {
  res.send("Welcome to todo app server");
});

// application routes

// todo routes
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
