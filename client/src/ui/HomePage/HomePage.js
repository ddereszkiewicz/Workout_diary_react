import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { getWorkouts } from "../../state/ducks/workouts/operations";
import { getWorkoutSchemas } from "../../state/ducks/workoutSchemas/operations";
import { getExercises } from "../../state/ducks/exercises/operations";
import WorkoutSchemasPage from "./WorkoutSchemas/WorkoutSchemasPage";
import { connect } from "react-redux";
import { workoutSchemasSelector } from "../../state/ducks/workoutSchemas/selectors";

import Workouts from "./Workouts/Workouts";
import { selectFilteredByNameWorkouts } from "../../state/ducks/workouts/selectors";

const HomePage = ({
  getWorkouts,
  getWorkoutSchemas,
  user,
  getExercises,
  workoutSchemas,
  workouts,
}) => {
  useEffect(() => {
    (async function () {
      await getWorkoutSchemas(user.id);
      await getExercises(user.id);
      await getWorkouts(user.id);
    })();
  }, [user, getWorkoutSchemas, getWorkouts, getExercises]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(value);
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `navigation-tabs-${index}`,
    };
  }
  return (
    <div className="homePage">
      {!user.logged ? <Redirect to="/" /> : <Redirect to="/home/workouts" />}
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="Workouts"
            {...a11yProps(0)}
            component={Link}
            to="/home/workouts"
          />
          <Tab
            label="Workout Schemas"
            {...a11yProps(1)}
            component={Link}
            to="/home/workout-schemas"
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route path="/home/workouts">
          <Workouts workouts={workouts} user={user} />
        </Route>

        <Route path="/home/workout-schemas">
          <WorkoutSchemasPage workoutSchemas={workoutSchemas} user={user} />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    workoutSchemas: workoutSchemasSelector(state),
    workouts: selectFilteredByNameWorkouts(state),
  };
};

export default connect(mapStateToProps, {
  getWorkouts,
  getWorkoutSchemas,
  getExercises,
})(HomePage);
