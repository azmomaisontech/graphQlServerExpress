const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email address"]
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      select: false
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

//Reverse populate the Virtual Properties
UserSchema.virtual("createdEvents", {
  ref: "Event",
  localField: "_id",
  foreignField: "creator",
  justOne: false
});

module.exports = mongoose.model("User", UserSchema);

//   createdEvent: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Event"
//     }
//   ]
