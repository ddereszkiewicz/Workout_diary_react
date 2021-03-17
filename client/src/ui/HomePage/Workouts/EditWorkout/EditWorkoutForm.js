import React from "react";
import { useFormik } from "formik";
import {
  Card,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { patchExercises } from "../../../../state/ducks/exercises/operations";
const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardTypo: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  select: {
    minWidth: "120px",
  },
  sendButton: {
    position: "fixed",
    bottom: "20px",
    right: "100px",
  },
}));
const EditWorkoutForm = ({
  workoutId,
  exercises,
  patchExercises,
  onSelectToEdit,
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      exercises: exercises[workoutId],
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
      patchExercises(values.exercises);
      onSelectToEdit("");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {workoutId &&
        exercises[workoutId].map((ex, i) => (
          <Card className={classes.card} key={ex.id}>
            <CardContent direction="column" className={classes.content}>
              <Typography className={classes.cardTypo}>{ex.name}</Typography>
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
      <div className={classes.sendButton}>
        <IconButton type="submit">
          <SendIcon color="primary" fontSize="large" />
        </IconButton>
        <IconButton onClick={() => onSelectToEdit("")}>
          <CancelIcon color="secondary" fontSize="large" />
        </IconButton>
      </div>
    </form>
  );
};

export default connect(null, { patchExercises })(EditWorkoutForm);
