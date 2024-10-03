// dependencies
const express = require("express");

// create express app
const app = express();

// server port number
const port = process.env.PORT || 3000;

// todo server root route
app.get("/", (req, res) => {
  res.send("Welcome to todo app server");
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
