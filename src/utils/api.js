import { BASE_URL } from "./CONSTANTS";
import store from "../redux/store";
import {
  createMazeRequest,
  createMazeSuccess,
  createMazeFailure,
  getMazeRequest,
  getMazeSuccess,
  getMazeFailure,
} from "../redux/Maze/maze.actions";
import { setGameStarted } from "../redux/App/app.actions";

export const createMaze = async ({ width, height, difficulty }) => {
  try {
    store.dispatch(createMazeRequest());
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "maze-width": parseInt(width),
        "maze-height": parseInt(height),
        "maze-player-name": "Twilight Sparkle",
        difficulty: parseInt(difficulty),
      }),
    });
    const content = await response.json();
    store.dispatch(createMazeSuccess(content.maze_id));
  } catch (e) {
    store.dispatch(createMazeFailure(e));
    return new Error(e);
  }
};

export const getMaze = async (mazeId) => {
  try {
    store.dispatch(getMazeRequest());
    await fetch(`${BASE_URL}/${mazeId}`)
      .then((response) => response.json())
      .then((json) => {
        store.dispatch(getMazeSuccess(json));
      });
  } catch (e) {
    store.dispatch(getMazeFailure(e));
    return new Error(e);
  }
};

export const makeNextMove = async (mazeId, direction) => {
  const response = await fetch(`${BASE_URL}/${mazeId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      direction,
    }),
  });
  const content = await response.json();
  const isMoveAccepted = content["state-result"] === "Move accepted";
  console.log(isMoveAccepted);
};
