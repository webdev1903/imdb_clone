const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    bio: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("producer", producerSchema);
