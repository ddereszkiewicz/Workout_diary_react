const { Schema, model } = require("mongoose");

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const workoutSchemaSchema = new Schema(
  {
    name: String,
    exercises: [String],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    date: Date,
  },
  { collection: "workoutSchemas" }
);

module.exports = model("WorkoutSchema", workoutSchemaSchema);
