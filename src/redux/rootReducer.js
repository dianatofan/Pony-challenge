import { combineReducers } from "redux";

import appReducer from "./App/app.reducer";
import mazeReducer from "./Maze/maze.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  maze: mazeReducer,
});

export default rootReducer;
