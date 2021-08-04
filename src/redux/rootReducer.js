import { combineReducers } from "redux";

import appReducer from "./App/app.reducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
