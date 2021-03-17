const express = require("express");
const router = express.Router();

const WorkOutSchema = require("../models/WorkOutSchema");
const Exercise = require("../models/Exercise");
router.get("/:idUser", async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const workOutSchemas = await WorkOutSchema.find({ author: idUser });

    const result = workOutSchemas.map(workOutSchema => ({
      date: `${workOutSchema.date.getDate()}-${
        workOutSchema.date.getMonth() + 1
      }-${workOutSchema.date.getFullYear()}`,
      name: workOutSchema.name,
      exercises: workOutSchema.exercises,
      author: workOutSchema.author,
      id: workOutSchema._id,
    }));

    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const workOutSchema = await WorkOutSchema.find({ _id: id });
    res.send({
      ...workOutSchema,
      date: `${workOutSchema.date.getDate()}-${workOutSchema.date.getMonth()}-${workOutSchema.date.getFullYear()}`,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.post("/:idUser", async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const workOutSchema = new WorkOutSchema({
      ...req.body,
      author: idUser,
      date: new Date(),
    });
    console.log(workOutSchema);
    await workOutSchema.save();
    res.send({
      date: `${workOutSchema.date.getDate()}-${
        workOutSchema.date.getMonth() + 1
      }-${workOutSchema.date.getFullYear()}`,
      name: workOutSchema.name,
      exercises: workOutSchema.exercises,
      author: workOutSchema.author.toString(),
      id: workOutSchema._id,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

router.patch("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await WorkOutSchema.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.send({
      name: result.name,
      exercises: result.exercises,
      author: result.author.toString(),
      date: `${result.date.getDate()}-${
        result.date.getMonth() + 1
      }-${result.date.getFullYear()}`,
      id: result._id,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

module.exports = router;
