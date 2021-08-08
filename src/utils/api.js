import { BASE_URL } from "./CONSTANTS";
import store from "../redux/store";
import {
  createMazeRequest,
  createMazeSuccess,
  createMazeFailure,
  getMazeRequest,
  getMazeSuccess,
  getMazeFailure,
  resetMaze,
  makeMoveFailure,
  makeMoveRequest,
  makeMoveSuccess,
} from "../redux/Maze/maze.actions";
import { setGameOver, setGameWon } from "../redux/App/app.actions";

// Called when clicking on the 'Play' button to generate the mazeId, given the maze parameters
export const createMaze = async ({ width, height, difficulty }) => {
  try {
    store.dispatch(createMazeRequest()); // notify Redux an API request has been made
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
    store.dispatch(createMazeSuccess(content.maze_id)); // save the mazeId in the store
  } catch (e) {
    store.dispatch(createMazeFailure(e)); // save the error in the store
    return new Error(e);
  }
};

// Update maze with the pony and domokun's locations
export const getMaze = async (mazeId) => {
  try {
    store.dispatch(getMazeRequest());
    await fetch(`${BASE_URL}/${mazeId}`)
      .then((response) => response.json())
      .then((json) => {
        store.dispatch(getMazeSuccess(json)); // save the maze content in the store
      });
  } catch (e) {
    store.dispatch(getMazeFailure(e)); // save the error in the store
    return new Error(e);
  }
};

// Move pony to the specified direction
export const makeNextMove = async (mazeId, direction) => {
  try {
    store.dispatch(makeMoveRequest());
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
    if (content.state === "active") {
      // game is active
      // if move is valid (no obstructing walls)
      await getMaze(mazeId); // update maze with the new locations
      store.dispatch(makeMoveSuccess());
    } else {
      store.dispatch(resetMaze()); // reset maze as the game ended
      if (content.state === "won") {
        store.dispatch(setGameWon());
      } else {
        store.dispatch(setGameOver());
      }
    }
  } catch (e) {
    store.dispatch(makeMoveFailure(e));
    return new Error(e);
  }
};
