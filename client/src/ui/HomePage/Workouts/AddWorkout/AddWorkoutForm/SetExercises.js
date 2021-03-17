import React from "react";
import { useFormik } from "formik";
import {
  Card,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";
const SetExercises = ({ schema, classes, addWorkout, user, setSchema }) => {
  const formik = useFormik({
    initialValues: {
      exercises: schema.exercises.map(ex => ({
        name: ex,
        reps: 0,
        series: 0,
        weight: 0,
      })),
    },
    validate: values => {
      let errors = {};
      if (
        !values.exercises.every(
          item =>
            Number.isInteger(item.reps) &&
            Number.isInteger(item.series) &&
            Number.isInteger(item.weight)
        )
      ) {
        errors.exercises = "All values have to be numbers";
      }
      return errors;
    },
    onSubmit: values => {
      addWorkout(
        { exercises: values.exercises, workoutSchema: schema.id },
        user.id
      );
      setSchema("");
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {schema &&
        schema.exercises.map((exercise, i) => (
          <Card className={classes.card} key={exercise}>
            <CardContent direction="column" className={classes.content}>
              <Typography className={classes.cardTypo}>{exercise}</Typography>
              <TextField
                className={classes.cardTypo}
                id="standard-basic"
                type="number"
                label="Series"
                onChange={formik.handleChange}
                name={`exercises[${i}].series`}
                value={formik.values.exercises[i].series}
              />
              <TextField
                className={classes.cardTypo}
                id="standard-basic"
                type="number"
                label="Reps"
                onChange={formik.handleChange}
                name={`exercises[${i}].reps`}
                value={formik.values.exercises[i].reps}
              />
              <TextField
                value={formik.values.exercises[i].weight}
                className={classes.cardTypo}
                id="standard-basic"
                type="number"
                label="Weigth"
                onChange={formik.handleChange}
                name={`exercises[${i}].weight`}
              />
            </CardContent>
          </Card>
        ))}
      <Snackbar open={Boolean(formik.errors.exercises)} autoHideDuration={6000}>
        <Alert severity="error">{formik.errors.exercises}</Alert>
      </Snackbar>
      <IconButton type="submit" className={classes.sendButton}>
        <SendIcon color="primary" fontSize="large" />
      </IconButton>
    </form>
  );
};

export default SetExercises;
