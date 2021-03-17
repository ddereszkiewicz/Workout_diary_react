const { Schema, model } = require("mongoose");

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const exerciseSchema = new Schema(
  {
    name: String,
    series: Number,
    reps: Number,
    weight: Number,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "exercises" }
);

module.exports = model("Exercise", exerciseSchema);
