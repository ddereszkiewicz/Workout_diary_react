import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import {
  getEditedWorkout,
  workoutsExercisesSelector,
  workoutsSchemaSelector,
} from "../../../state/ducks/workouts/selectors";
import { Switch, Route } from "react-router-dom";
import WorkoutsCollapsibleTable from "./WorkoutsCollapsibleTable";

import AddWorkout from "./AddWorkout/AddWorkout";

import {
  oneWorkoutSchemaSelector,
  workoutSchemasSelector,
} from "../../../state/ducks/workoutSchemas/selectors";
import {
  selectToEdit,
  setNameFilter,
} from "../../../state/ducks/workouts/actions";
import EditWorkoutForm from "./EditWorkout/EditWorkoutForm";
import { delWorkout } from "../../../state/ducks/workouts/operations";
const Workouts = ({
  editedWorkout,
  workouts,
  workoutsSchema,
  workoutsExercises,
  user,
  workoutSchemas,
  onSelectToEdit,
  getSchema,
  getEditedWorkout,
  delWorkout,
  onSetNameFilter,
  nameFilter,
}) => {
  return (
    <div className="workout-schemas">
      <Grid container justify="center" direction="row">
        <Switch>
          <Route exact path="/home/workouts">
            {editedWorkout ? (
              <EditWorkoutForm
                workoutId={editedWorkout}
                exercises={workoutsExercises}
                onSelectToEdit={onSelectToEdit}
              />
            ) : (
              <WorkoutsCollapsibleTable
                onSetNameFilter={onSetNameFilter}
                delWorkout={delWorkout}
                workouts={workouts}
                workoutsSchema={workoutsSchema}
                workoutsExercises={workoutsExercises}
                onSelectToEdit={onSelectToEdit}
                nameFilter={nameFilter}
              />
            )}
          </Route>
          <Route exact path="/home/workouts/add">
            <AddWorkout user={user} workoutSchemas={workoutSchemas} />
          </Route>
        </Switch>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  workoutSchemas: workoutSchemasSelector(state),
  workoutsSchema: workoutsSchemaSelector(state),
  workoutsExercises: workoutsExercisesSelector(state),
  editedWorkout: state.workouts.editedWorkout,
  getSchema: id => oneWorkoutSchemaSelector(state, id),
  getEditedWorkout: getEditedWorkout(state),
  nameFilter: state.workouts.nameFilter,
});
const mapDispatchToProps = dispatch => ({
  onSetNameFilter: name => dispatch(setNameFilter(name)),
  onSelectToEdit: id => dispatch(selectToEdit(id)),
  delWorkout: id => dispatch(delWorkout(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Workouts);
