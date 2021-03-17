import { EDIT_WORKOUT, SET_NAME_FILTER } from "./types";

export const selectToEdit = id => ({ type: EDIT_WORKOUT, payload: id });

export const setNameFilter = name => ({ type: SET_NAME_FILTER, payload: name });
