const express = require("express");
const router = express.Router();

const Movie = require("../models/movie.model");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("actors").populate("producer");
    return res.status(200).send(movies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).send({ movie, message: "movie added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send({ movie, message: "updated successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    return res.status(202).send({ message: "deleted successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
