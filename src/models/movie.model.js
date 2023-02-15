const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plot: { type: String, required: true },
    year_of_release: { type: String, required: true },
    poster: { type: String, required: true },
    actors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "actor", required: true },
    ],
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "producer",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("movie", movieSchema);
