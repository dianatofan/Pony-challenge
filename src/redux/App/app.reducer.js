import { SET_GAME_STARTED } from "./app.types";

const INITIAL_STATE = {
  isGameStarted: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GAME_STARTED:
      return {
        ...state,
        isGameStarted: action.payload.isGameStarted,
      };

    default:
      return state;
  }
};

export default reducer;
