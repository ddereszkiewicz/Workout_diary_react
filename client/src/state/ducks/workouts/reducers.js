import { EDIT_WORKOUT, SET_NAME_FILTER } from "./types";

const initialState = {
  editedWorkout: "",
  nameFilter: "",
};

const workouts = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_WORKOUT: {
      return { ...state, editedWorkout: action.payload };
    }
    case SET_NAME_FILTER: {
      return { ...state, nameFilter: action.payload };
    }
    default:
      return state;
  }
};
const reducers = { workouts };
export default reducers;
