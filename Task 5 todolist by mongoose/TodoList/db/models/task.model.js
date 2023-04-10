const mongoose = require("mongoose");
const taskModel = mongoose.model("task", {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    lowercase: true,
    maxLength: 50,
    required: true,
  },

  status: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
});
module.exports = taskModel;
