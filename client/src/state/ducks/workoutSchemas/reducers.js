import { EDIT_SCHEMA, SET_NAME_FILTER } from "./types";

const initialState = {
  nameFilter: "",
  editedSchema: "",
};

const schemas = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SCHEMA: {
      return { ...state, editedSchema: action.payload };
    }
    case SET_NAME_FILTER: {
      return { ...state, nameFilter: action.payload };
    }
    default:
      return state;
  }
};
const reducers = { schemas };
export default reducers;
