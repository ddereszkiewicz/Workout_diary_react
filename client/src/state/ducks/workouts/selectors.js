import { createSelector } from "reselect";

export const workoutsSelector = state =>
  state.entities.workouts.allIds.map(id => state.entities.workouts.byId[id]);

export const workoutsSchemaSelector = createSelector(
  workoutsSelector,
  state => state.entities.workoutSchemas.byId,
  (workouts, schemas) => {
    return workouts.reduce((acc, next) => {
      return { ...acc, [next.id]: schemas[next.workoutSchema] };
    }, {});
  }
);

export const getEditedWorkout = createSelector(
  state => state.workouts.editedWorkout,
  state => state.entities.workouts.byId,
  (id, workouts) => workouts[id]
);

export const workoutsExercisesSelector = createSelector(
  workoutsSelector,
  state => state.entities.exercises.byId,
  (workouts, exercises) => {
    return workouts.reduce((acc, next) => {
      return { ...acc, [next.id]: next.exercises.map(id => exercises[id]) };
    }, {});
  }
);

export const selectFilteredByNameWorkouts = createSelector(
  workoutsSelector,
  state => state.workouts.nameFilter,
  state => state.entities.workoutSchemas.byId,
  (workouts, name, schemas) =>
    workouts.filter(n => schemas[n.workoutSchema].name.includes(name))
);
