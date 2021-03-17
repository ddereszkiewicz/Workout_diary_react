import {
  Grid,
  Card,
  CardContent,
  makeStyles,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import React, { useState } from "react";

import { connect } from "react-redux";
import { addWorkout } from "../../../../../state/ducks/workouts/operations";

import { oneWorkoutSchemaSelector } from "../../../../../state/ducks/workoutSchemas/selectors";
import SetExercises from "./SetExercises";

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
const AddWorkoutSchemaForm = ({
  addWorkout,
  user,
  getSchema,
  workoutSchemas,
}) => {
  const classes = useStyles();

  const [schema, setSchema] = useState("");

  return (
    <Grid item sm={6} container direction="column" alignItems="stretch">
      <Grid item sm={12}>
        <Card className={classes.card}>
          <CardContent direction="column" className={classes.content}>
            <FormControl className={classes.select}>
              <InputLabel id="input-schema-label">Schema</InputLabel>
              <Select
                labelId="input-schema-label"
                id="demo-simple-select"
                name="schema"
                value={schema}
                onChange={e => setSchema(e.target.value)}
                label="schema"
              >
                {workoutSchemas.map(schema => (
                  <MenuItem key={schema.id} value={schema.id}>
                    {schema.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>select training schema</FormHelperText>
            </FormControl>
            <Avatar>
              <FitnessCenterIcon />
            </Avatar>
          </CardContent>
        </Card>
        {schema && (
          <SetExercises
            setSchema={setSchema}
            schema={getSchema(schema)}
            classes={classes}
            addWorkout={addWorkout}
            user={user}
          />
        )}
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => ({
  getSchema: id => oneWorkoutSchemaSelector(state, id),
});

export default connect(mapStateToProps, { addWorkout })(AddWorkoutSchemaForm);
