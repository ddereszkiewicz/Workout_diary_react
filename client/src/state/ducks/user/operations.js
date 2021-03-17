import { createAction } from "redux-api-middleware";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCES,
} from "./types";

export const login = (login, password) =>
  createAction({
    endpoint: "http://localhost:5000/users/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
    types: [LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAILURE],
  });

export const register = (login, password) =>
  createAction({
    endpoint: "http://localhost:5000/users/register",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
    types: [REGISTER_REQUEST, REGISTER_SUCCES, REGISTER_FAILURE],
  });
