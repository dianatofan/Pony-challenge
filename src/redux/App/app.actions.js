import { SET_GAME_STARTED } from "./app.types";

export const setGameStarted = (isGameStarted) => {
  return {
    type: SET_GAME_STARTED,
    payload: {
      isGameStarted,
    },
  };
};
