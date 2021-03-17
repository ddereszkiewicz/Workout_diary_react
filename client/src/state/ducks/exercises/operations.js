import {
  EXERCISES_FAILURE,
  EXERCISES_REQUEST,
  EXERCISES_SUCCESS,
} from "./types";
import { createAction } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

const exerciseSchema = new schema.Entity("exercises");
const exercisesSchema = new schema.Array(exerciseSchema);

export const getExercises = userId => dispatch => {
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/exercises/${userId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [
        EXERCISES_REQUEST,
        {
          type: EXERCISES_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, exercisesSchema);
            return entities;
          },
          meta: { actionType: "GET_ALL" },
        },
        EXERCISES_FAILURE,
      ],
    })
  );
};

export const addExercises = values => dispatch =>
  dispatch(
    createAction({
      endpoint: "http://jsonplaceholder.typicode.com/exercises",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
      types: [
        EXERCISES_REQUEST,
        {
          type: EXERCISES_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, exerciseSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        EXERCISES_FAILURE,
      ],
    })
  );

export const patchExercises = values => dispatch =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/workouts`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exercises: values }),
      types: [
        EXERCISES_REQUEST,
        {
          type: EXERCISES_SUCCESS,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, exercisesSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        EXERCISES_FAILURE,
      ],
    })
  );
