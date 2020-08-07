const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolver = require("./graphql/resolver/index");

const app = express();

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
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
