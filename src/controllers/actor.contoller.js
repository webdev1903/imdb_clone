const express = require("express");
const router = express.Router();

const Actor = require("../models/actor.model");

router.post("", async (req, res) => {
  try {
    let obj = { ...req.body, dob: new Date(req.body.dob) };
    const actor = await Actor.create(obj);
    return res.status(201).send(actor);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("", async (req, res) => {
  try {
    const actors = await Actor.find();
    if (req.query.q) {
      let filteredActors = actors.filter((e) => e.name.includes(req.query.q));
      return res.status(201).send(filteredActors);
    }
    return res.status(201).send(actors);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
