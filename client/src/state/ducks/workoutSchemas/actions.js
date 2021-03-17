import { EDIT_SCHEMA, SET_NAME_FILTER } from "./types";

export const setNameFilter = name => ({ type: SET_NAME_FILTER, payload: name });

export const selectSchemaToEdit = id => ({ type: EDIT_SCHEMA, payload: id });
