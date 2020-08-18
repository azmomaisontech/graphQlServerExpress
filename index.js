const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolver = require("./graphql/resolver/index");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

connectDB();

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.use(authMiddleware);

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
