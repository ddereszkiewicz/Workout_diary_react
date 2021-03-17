const express = require("express");
const router = express.Router();

const Exercise = require("../models/Exercise");

router.get("/:idUser", async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const exercises = await Exercise.find({ author: idUser });
    console.log(exercises);
    const result = exercises.map(exercise => ({
      name: exercise.name,
      author: exercise.author.toString(),
      reps: exercise.reps,
      series: exercise.series,
      id: exercise._id,
      weight: exercise.weight,
    }));
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

router.post("/:idUser", async (req, res) => {
  const idUser = req.params.idUser;
  try {
    const exercise = new Exercise({ ...req.body, author: idUser });
    const result = await exercise.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
