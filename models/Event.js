const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title"]
  },
  description: {
    type: String,
    required: [true, "Please add a brief description of the event"]
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the event"]
  },
  date: {
    type: Date,
    required: [true, "Please enter a date"]
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Event", EventSchema);
