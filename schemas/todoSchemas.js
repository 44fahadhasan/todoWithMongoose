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

// statics methods
todoSchema.statics = {
  findTitte: function (value) {
    return this.find({ title: value });
  },
};

// query helper
todoSchema.query = {
  byWord: function (value) {
    return this.find({ title: new RegExp(value, "i") });
  },
};

module.exports = todoSchema;
