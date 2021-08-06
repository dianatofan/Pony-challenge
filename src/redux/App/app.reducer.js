import { SET_GAME_OVER, SET_GAME_WON, RESET_GAME } from "./app.types";

const INITIAL_STATE = {
  isGameWon: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GAME_OVER:
      return {
        ...state,
        isGameWon: false,
      };
    case SET_GAME_WON:
      return {
        ...state,
        isGameWon: true,
      };
    case RESET_GAME:
      return {
        ...state,
        isGameWon: null,
      };
    default:
      return state;
  }
};

export default reducer;
