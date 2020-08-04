const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events: [String!]!
    }

    type RootMutation {
        createEvent(name: String): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return ["Romantic Cooking", "Sailing", "All night coding"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`
Server running in ${MODE} Mode, Listening on Port ${PORT}`);
});
