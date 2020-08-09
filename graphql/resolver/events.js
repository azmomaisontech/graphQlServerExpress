const Event = require("../../models/Event");

module.exports = {
  events: async () => {
    try {
      return await Event.find().populate("creator");
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
  }
};
