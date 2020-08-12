const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

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
  },

  login: async ({ loginInput }) => {
    //I am not using try catch here because i want the errors to be shown on the graphiQl
    const registeredUser = await User.findOne({ email: loginInput.email }).select("+password");
    if (!registeredUser) throw new Error("Username or password not correct");

    const isMatch = await bcrypt.compare(loginInput.password, registeredUser.password);
    console.log(isMatch);
    if (!isMatch) throw new Error("Username or password not correct");

    const token = jwt.sign({ userId: registeredUser.id, email: registeredUser.email }, process.env.JWTKey, {
      expiresIn: "1h"
    });

    return { userId: registeredUser.id, token, tokenExpiration: 1 };
  }
};
