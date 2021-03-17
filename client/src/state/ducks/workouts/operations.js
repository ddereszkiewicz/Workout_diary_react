import { WORKOUTS_FAILURE, WORKOUTS_REQUEST, WORKOUTS_SUCCESS } from "./types";
import { createAction } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

const exerciseSchema = new schema.Entity("exercises");
const workoutSchema = new schema.Entity("workouts", {
  exercises: [exerciseSchema],
});

const workoutsSchema = new schema.Array(workoutSchema);

export const getWorkouts = userId => dispatch => {
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workouts/${userId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [
        WORKOUTS_REQUEST,
        {
          type: WORKOUTS_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, workoutsSchema);
            return entities;
          },
          meta: { actionType: "GET_ALL" },
        },
        WORKOUTS_FAILURE,
      ],
    })
  );
};

export const addWorkout = (values, userId) => dispatch =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workouts/${userId}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
      types: [
        WORKOUTS_REQUEST,
        {
          type: WORKOUTS_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, workoutSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        WORKOUTS_FAILURE,
      ],
    })
  );

export const delWorkout = id => dispatch =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workouts/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
      types: [
        WORKOUTS_REQUEST,
        {
          type: WORKOUTS_SUCCESS,
          payload: async (action, state, res) => {
            const entities = { workouts: { id } };
            return entities;
          },
          meta: { actionType: "DELETE_ONE" },
        },
        WORKOUTS_FAILURE,
      ],
    })
  );

// export const putWorkouts = values => dispatch =>
//   dispatch(
//     createAction({
//       endpoint: `https://jsonplaceholder.typicode.com/workouts/${values.id}`,
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...values,
//       }),
//       types: [
//         WORKOUTS_REQUEST,
//         {
//           type: PATCH_WORKOUTS,
//           payload: async (action, state, res) => {
//             const json = await res.json();
//             const { entities } = normalize(json, workoutSchema);
//             return entities;
//           },
//           meta: { actionType: "GET_ONE" },
//         },
//         WORKOUTS_FAILURE,
//       ],
//     })
//   );
