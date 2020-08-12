const Event = require("../../models/Event");

module.exports = {
  events: async () => {
    try {
      return await Event.find().populate("creator");
    } catch (err) {
      console.error(err);
    }
  },

  singleEvent: async args => {
    try {
      return await Event.findById(args.eventId).populate("creator");
    } catch (err) {
      console.error(err);
    }
  },

  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated");
    }
    const event = {
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: req.userId
    };

    try {
      const newEvent = new Event(event);
      return await newEvent.save();
    } catch (err) {
      console.error(err);
    }
  }
};
