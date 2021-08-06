import { SET_GAME_OVER, SET_GAME_WON, RESET_GAME } from "./app.types";

export const setGameOver = () => ({
  type: SET_GAME_OVER,
});

export const setGameWon = () => ({
  type: SET_GAME_WON,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
