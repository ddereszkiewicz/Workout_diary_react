import {
  LOGIN_FAILURE,
  LOGIN_SUCCES,
  REGISTER_FAILURE,
  REGISTER_SUCCES,
} from "./types";

const initialState = {
  login: "",
  id: "",
  logged: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCES: {
      return {
        login: action.payload.login,
        id: action.payload.id,
        logged: true,
        error: "",
      };
    }
    case LOGIN_FAILURE: {
      return { ...initialState, error: "Please check your credentials" };
    }
    case REGISTER_SUCCES: {
      return {
        login: action.payload.login,
        id: action.payload.id,
        logged: true,
        error: "",
      };
    }
    case REGISTER_FAILURE: {
      return { ...initialState, error: "Username already taken" };
    }
    default:
      return state;
  }
};

export default userReducer;
