const express = require("express");
const router = express.Router();

const Producer = require("../models/producer.model");

router.post("", async (req, res) => {
  try {
    let obj = { ...req.body, dob: new Date(req.body.dob) };
    const producer = await Producer.create(obj);
    return res.status(201).send(producer);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("", async (req, res) => {
  try {
    const producers = await Producer.find();
    if (req.query.q) {
      let filteredProducers = producers.filter((e) =>
        e.name.includes(req.query.q)
      );
      return res.status(201).send(filteredProducers);
    }
    return res.status(201).send(producers);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
