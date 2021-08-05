import {
  SET_MAZE_ID,
  SET_MAZE_SUCCESS,
  SET_MAZE,
  SET_MAZE_ASYNC,
} from "./maze.types";

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

export const setMazeAsync = (maze) => {
  return {
    type: SET_MAZE_ASYNC,
    payload: {
      maze,
    },
  };
};

export const setMazeSuccess = (setMazeSuccess) => {
  return {
    type: SET_MAZE_SUCCESS,
    payload: {
      setMazeSuccess,
    },
  };
};

export const setMazeFailure = (setMazeSuccess) => {
  return {
    type: SET_MAZE,
    payload: {
      setMazeSuccess,
    },
  };
};
