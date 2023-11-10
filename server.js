const mongoose = require("mongoose")
require("dotenv").config();
const app = require("./app");

const { DB_HOST, PORT = 3034 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT, () => console.log("Server Started!")))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });