// dependencies
const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchemas");

// create a model
const Todo = new mongoose.model("Todo", todoSchema);

// init route
const todoRoutes = express.Router();

// get all inactive todo (instance methods)
todoRoutes.get("/inactive", async (req, res) => {
  try {
    const todo = new Todo();
    const result = await todo.findActiveTodo({ status: "inactive" });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all todo
todoRoutes.get("/all", async (req, res) => {
  Todo.find({}, {}, {})
    .limit(1)
    .skip(1)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get a single todo
todoRoutes.get("/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// post multiple todo
todoRoutes.post("/all", async (req, res) => {
  try {
    const result = await Todo.insertMany(req.body, { rawResult: true });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// post a single todo
todoRoutes.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// update multiple todo
todoRoutes.put("/", (req, res) => {});

// update a single todo
todoRoutes.put("/:id", async (req, res) => {
  try {
    const result = await Todo.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete multiple todo
todoRoutes.put("/", (req, res) => {});

// delete a single todo
todoRoutes.delete("/:id", (req, res) => {});

// export the route
module.exports = todoRoutes;
