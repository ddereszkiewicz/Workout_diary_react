import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import entities from "./ducks/entities";
import { createMiddleware } from "redux-api-middleware";
import user from "./ducks/user/reducers";
import workouts from "./ducks/workouts/reducers";
import schemas from "./ducks/workoutSchemas/reducers";
const rootReducer = combineReducers({
  user,
  ...entities,
  ...workouts,
  ...schemas,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, createMiddleware(), logger))
);

export default store;
