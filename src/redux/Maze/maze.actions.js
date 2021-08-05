import { SET_MAZE_ID } from "./maze.types";
import { SET_MAZE } from "./maze.types";

export const setMazeId = (mazeId) => {
  return {
    type: SET_MAZE_ID,
    payload: {
      mazeId,
    },
  };
};

export const setMaze = (maze) => {
  return {
    type: SET_MAZE,
    payload: {
      maze,
    },
  };
};
