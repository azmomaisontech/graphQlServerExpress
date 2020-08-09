const authResolver = require("./auth");
const eventResolver = require("./events");
const bookingResolver = require("./booking");

const graphQlResolver = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver
};

module.exports = graphQlResolver;
