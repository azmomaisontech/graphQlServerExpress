const bcrypt = require("bcryptjs");
const User = require("../../models/User");

module.exports = {
  users: async () => {
    try {
      return await User.find().populate("createdEvents");
    } catch (err) {
      console.log(err);
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
  }
};
