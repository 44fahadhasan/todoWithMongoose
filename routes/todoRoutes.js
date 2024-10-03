// dependencies
const express = require("express");

// init route
const todoRoutes = express.Router();

// get all todo
todoRoutes.get("/all", (req, res) => {});

// get a single todo
todoRoutes.get("/:id", (req, res) => {});

// post multiple todo
todoRoutes.post("/all", (req, res) => {});

// post a single todo
todoRoutes.post("/:id", (req, res) => {});

// update multiple todo
todoRoutes.put("/", (req, res) => {});

// update a single todo
todoRoutes.put("/:id", (req, res) => {});

// delete multiple todo
todoRoutes.put("/", (req, res) => {});

// delete a single todo
todoRoutes.delete("/:id", (req, res) => {});

// export the route
module.exports = todoRoutes;
