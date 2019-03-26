"use strict";

const mongoose = require("mongoose");

const updateSchema = mongoose.Schema({
  // _id

  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Update", updateSchema);
