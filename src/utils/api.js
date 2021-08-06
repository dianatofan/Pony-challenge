import { BASE_URL } from "./CONSTANTS";
import store from "../redux/store";
import { setMazeId } from "../redux/Maze/maze.actions";
import { setMaze } from "../redux/Maze/maze.actions";
import { setGameStarted } from "../redux/App/app.actions";

export const createMaze = async (width, height, difficulty) => {
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
  store.dispatch(setMazeId(content.maze_id));
  store.dispatch(setGameStarted(true));
};

export const fetchCreate = ({ width, height, difficulty }) =>
  fetch(`${BASE_URL}`, {
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

export const getMaze = async (mazeId) => {
  await fetch(`${BASE_URL}/${mazeId}`)
    .then((response) => response.json())
    .then((json) => {
      store.dispatch(setMaze(json));
    });
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
