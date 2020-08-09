const bcrypt = require("bcryptjs");
const Event = require("../../models/Event");
const User = require("../../models/User");
const Booking = require("../../models/Booking");

module.exports = {
  users: async () => {
    try {
      return await User.find().populate("createdEvents");
    } catch (err) {
      console.log(err);
    }
  },

  events: async () => {
    try {
      return await Event.find().populate("creator");
    } catch (err) {
      console.error(err);
    }
  },

  bookings: async () => {
    try {
      return await Booking.find().populate("user event");
    } catch (err) {
      console.error(err);
    }
  },

  createEvent: async ({ eventInput }) => {
    const event = {
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: "5f2aae65b809bc45d6cd5f8f"
    };

    try {
      const newEvent = new Event(event);
      return await newEvent.save();
    } catch (err) {
      console.error(err);
    }
  },

  createUser: async ({ userInput }) => {
    try {
      const alreadyExist = await User.findOne({ email: userInput.email });
      if (alreadyExist) throw new Error("User already exists");

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userInput.password, salt);
      const user = {
        email: userInput.email,
        password: password
      };
      const newUser = new User(user);
      return newUser.save();
    } catch (err) {
      console.error(err);
    }
  },

  bookEvent: async args => {
    try {
      const booking = new Booking({
        user: "5f2aae65b809bc45d6cd5f8f",
        event: args.eventId
      });

      const newBooking = await booking.save();

      //I want to return a booking object with the event and user object populated, not just their id
      const populatedBooking = await Booking.findById(newBooking._id).populate("user event");
      return populatedBooking;
    } catch (err) {
      console.error(err);
    }
  }
};
