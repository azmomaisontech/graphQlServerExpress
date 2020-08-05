const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email address"]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false
  },
  createdEvent: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Event"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
