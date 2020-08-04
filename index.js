const express = require("express");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`
Server running in ${MODE} Mode, Listening on Port ${PORT}`);
});
