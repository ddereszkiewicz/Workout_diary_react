const { Schema, model } = require("mongoose");

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const workoutSchema = new Schema(
  {
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    workoutSchema: { type: Schema.Types.ObjectId, ref: "WorkOutSchema" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    date: Date,
  },
  { collection: "workouts" }
);

module.exports = model("WorkOut", workoutSchema);
