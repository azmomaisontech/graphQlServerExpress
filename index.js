const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(express.json());

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

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: ({ eventInput }) => {
        const event = {
          _id: Math.random().toString(),
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: eventInput.date
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`
Server running in ${MODE} Mode, Listening on Port ${PORT}`);
});
