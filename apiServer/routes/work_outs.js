const express = require("express");
const router = express.Router();

const WorkOut = require("../models/WorkOut");
const Exercise = require("../models/Exercise");

router.get("/:idUser", async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const work_outs = await WorkOut.find({ author: idUser });

    const result = work_outs.map(workout => ({
      id: workout._id,
      date: `${workout.date.getDate()}-${
        workout.date.getMonth() + 1
      }-${workout.date.getFullYear()}`,
      workoutSchema: workout.workoutSchema.toString(),
      author: workout.author.toString(),
      exercises: workout.exercises.map(ex => ex.toString()),
    }));

    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const work_out = await WorkOut.find({ _id: req.params.id }).populate(
      "exercises"
    );

    res.send(work_out);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
router.patch("/", async (req, res) => {
  try {
    const { exercises } = req.body;

    const exercisesToMongo = await Promise.all(
      exercises.map(async ex => {
        const result = await Exercise.findByIdAndUpdate(
          ex.id,
          {
            reps: ex.reps,
            series: ex.series,
            weight: ex.weight,
          },
          { new: true }
        );
        return result;
      })
    );
    console.log(exercisesToMongo);
    res.send(
      exercisesToMongo.map(ex => ({
        reps: ex.reps,
        series: ex.series,
        id: ex._id,
        weight: ex.weight,
      }))
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

router.post("/:idUser", async (req, res) => {
  try {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    const idSchema = req.body.workoutSchema;
    const idUser = req.params.idUser;
    const { exercises } = req.body;
    const exercisesMongo = exercises.map(
      exercise => new Exercise({ ...exercise, author: idUser })
    );
    exercisesMongo.forEach(async exercise => await exercise.save());

    const workout = new WorkOut({
      ...req.body,
      author: idUser,
      date: date,
      workoutSchema: idSchema,
      exercises: exercisesMongo.map(ex => ex._id),
    });
    await workout.save();

    res.send({
      id: workout._id,
      date: `${workout.date.getDate()}-${
        workout.date.getMonth() + 1
      }-${workout.date.getFullYear()}`,
      workoutSchema: workout.workoutSchema.toString(),
      author: workout.author.toString(),
      exercises: exercisesMongo.map(ex => ({
        id: ex._id,
        reps: ex.reps,
        name: ex.name,
        series: ex.series,
        weight: ex.weight,
        author: ex.author.toString(),
      })),
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const workout = await WorkOut.findById(id);
    const delExercises = workout.exercises.map(
      async ex => await Exercise.findByIdAndDelete(ex)
    );
    await Promise.all(delExercises);
    const result = await WorkOut.findByIdAndDelete(id);
    res.send(id);
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});
module.exports = router;
