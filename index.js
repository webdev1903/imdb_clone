const express = require("express");
const cors = require("cors");
const connect = require("./src/configs/db");

require("dotenv").config();

const actorController = require("./src/controllers/actor.contoller");
const producerController = require("./src/controllers/producer.controller");
const movieController = require("./src/controllers/movie.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/actors", actorController);
app.use("/movies", movieController);
app.use("/producers", producerController);

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log("listening on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
