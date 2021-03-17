import {
  Grid,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Avatar,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import { connect } from "react-redux";

import CancelIcon from "@material-ui/icons/Cancel";
import { editWorkoutSchema } from "../../../../state/ducks/workoutSchemas/operations";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTypo: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));
const EditSchemaForm = ({
  editWorkoutSchema,
  user,
  schema,
  onSelectToEdit,
}) => {
  const classes = useStyles();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpenSnackBar(false);
  };
  const createInitialState = list => {
    let result = list;
    for (let i = list.length; i < 20; i++) {
      result = [...result, ""];
    }
    return result;
  };

  const [exerciseNumber, setExerciseNumber] = React.useState(
    schema.exercises.length
  );
  const formik = useFormik({
    initialValues: {
      name: schema.name,
      exercises: createInitialState(schema.exercises),
    },
    onSubmit: values => {
      editWorkoutSchema({
        _id: schema.id,
        name: values.name,
        exercises: values.exercises.filter(n => n !== ""),
      });

      formik.resetForm();
      onSelectToEdit("");
    },
    validate: () => {
      let errors = {};
      if (!formik.values.name) {
        errors.name = "Name has to be specified!";
      }
      if (formik.values.exercises.filter(n => n !== "").length === 0) {
        errors.name =
          "You have to add at least one exercise to your training routine!";
      }
      return errors;
    },
  });
  const forms = num => {
    const list = [];

    for (let i = 0; i < num; i++) {
      list.push(
        <Card className={classes.card} key={i}>
          <CardContent direction="column" className={classes.content}>
            <TextField
              className={classes.cardTypo}
              id="standard-basic"
              label="Exercise"
              value={formik.values.exercises[i]}
              name={`exercises[${i}]`}
              onChange={formik.handleChange}
            />
            <IconButton
              onClick={() => {
                setExerciseNumber(prevState => prevState - 1);
                formik.values.exercises = [
                  ...formik.values.exercises.slice(0, i),
                  ...formik.values.exercises.slice(
                    i + 1,
                    formik.values.exercises.length + 1
                  ),
                ];
                formik.values.exercises.push("");
              }}
            >
              <CancelIcon />
            </IconButton>
          </CardContent>
        </Card>
      );
    }
    list.reverse();
    return list;
  };

  return (
    <Grid item sm={6} container direction="column" alignItems="stretch">
      <form onSubmit={formik.handleSubmit}>
        <Grid item sm={12}>
          <Card className={classes.card}>
            <CardContent direction="column" className={classes.content}>
              <Avatar>
                <FitnessCenterIcon />
              </Avatar>

              <TextField
                className={classes.cardTypo}
                id="standard-basic"
                label="Schema name"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
              />

              <IconButton
                onClick={() =>
                  setExerciseNumber(prevState => {
                    if (prevState === 20) {
                      setOpenSnackBar(true);
                      return prevState;
                    } else {
                      return prevState + 1;
                    }
                  })
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton onClick={() => onSelectToEdit("")} type="button">
                <CancelIcon />
              </IconButton>
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </CardContent>{" "}
          </Card>
          {forms(exerciseNumber)}
        </Grid>
      </form>
      <Snackbar
        open={Boolean(formik.errors.name)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">{formik.errors.name}</Alert>
      </Snackbar>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">
          You cannot create a workout with more than 20 exercises!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default connect(null, { editWorkoutSchema })(EditSchemaForm);
