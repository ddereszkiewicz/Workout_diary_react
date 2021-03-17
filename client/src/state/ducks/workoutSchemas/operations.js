import {
  WORKOUT_SCHEMAS_FAILURE,
  WORKOUT_SCHEMAS_REQUEST,
  WORKOUT_SCHEMAS_SUCCESS,
} from "./types";
import { createAction } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

const workoutSchema = new schema.Entity("workoutSchemas");
const workoutSchemasSchema = new schema.Array(workoutSchema);

export const getWorkoutSchemas = userId => dispatch => {
  console.log(userId);
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workout-schemas/${userId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [
        WORKOUT_SCHEMAS_REQUEST,
        {
          type: WORKOUT_SCHEMAS_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, workoutSchemasSchema);
            return entities;
          },
          meta: { actionType: "GET_ALL" },
        },
        WORKOUT_SCHEMAS_FAILURE,
      ],
    })
  );
};

export const addWorkoutSchema = (values, userId) => dispatch =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workout-schemas/${userId}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      types: [
        WORKOUT_SCHEMAS_REQUEST,
        {
          type: WORKOUT_SCHEMAS_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, workoutSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        WORKOUT_SCHEMAS_FAILURE,
      ],
    })
  );

export const delWorkoutSchema = id => dispatch =>
  dispatch(
    createAction({
      endpoint: `http://jsonplaceholder.typicode.com/workoutSchemas/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
      types: [
        WORKOUT_SCHEMAS_REQUEST,
        {
          type: WORKOUT_SCHEMAS_SUCCESS,
          payload: async (action, state, res) => {
            const entities = { workoutSchemas: { id } };
            return entities;
          },
          meta: { actionType: "DELETE_ONE" },
        },
        WORKOUT_SCHEMAS_FAILURE,
      ],
    })
  );

export const editWorkoutSchema = values => dispatch =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workout-schemas`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      types: [
        WORKOUT_SCHEMAS_REQUEST,
        {
          type: WORKOUT_SCHEMAS_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, workoutSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        WORKOUT_SCHEMAS_FAILURE,
      ],
    })
  );
