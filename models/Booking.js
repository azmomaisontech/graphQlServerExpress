const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: "Event"
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
