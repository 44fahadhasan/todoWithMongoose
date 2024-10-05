const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

// instance methods
todoSchema.methods = {
  findActiveTodo: (query) => {
    return mongoose.model("Todo").find(query);
  },
};

module.exports = todoSchema;
