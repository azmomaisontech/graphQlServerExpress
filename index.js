const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");
const Event = require("./models/Event");
const User = require("./models/User");
const app = express();

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

const events = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      price: Float!
      date: String! 
    }

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: async () => {
        try {
          return await Event.find();
        } catch (err) {
          console.error(err);
        }
      },
      createEvent: async ({ eventInput }) => {
        const event = {
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date(eventInput.date)
        };

        try {
          const newEvent = new Event(event);
          return await newEvent.save();
        } catch (err) {
          console.error(err);
        }
      },
      users: async () => {
        try {
          return await User.find();
        } catch (err) {
          console.log(err);
        }
      },
      createUser: async ({ userInput }) => {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(userInput.password, salt);
        const user = {
          email: userInput.email,
          password: password
        };
        try {
          const newUser = new User(user);
          return newUser.save();
        } catch (err) {
          console.error(err);
        }
      }
    },
    graphiql: true
  })
);

// To load server
const server = app.listen(PORT, () => {
  console.log(`
Server running in ${MODE} Mode, Listening on Port ${PORT}`);
});

// To close the server incase the database is not connecting
process.on("unhandledRejection", err => {
  console.log(err.message);

  server.close(() => {
    process.exit(1);
  });
});
