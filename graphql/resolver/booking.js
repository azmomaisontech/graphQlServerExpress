const Booking = require("../../models/Booking");

module.exports = {
  bookings: async req => {
    try {
      return await Booking.find().populate("user event");
    } catch (err) {
      console.error(err);
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated");
    }
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
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated");
    }
    try {
      let booking = await Booking.findById(args.bookingId).populate({
        path: "event",
        populate: {
          path: "creator"
        }
      });
      return await booking.remove();
    } catch (err) {
      console.error(err);
    }
  }
};
