import {
  CREATE_MAZE_REQUEST,
  CREATE_MAZE_SUCCESS,
  CREATE_MAZE_FAILURE,
  GET_MAZE_REQUEST,
  GET_MAZE_SUCCESS,
  GET_MAZE_FAILURE,
  RESET_MAZE,
} from "./maze.types";

export const createMazeRequest = (data) => ({
  type: CREATE_MAZE_REQUEST,
  data,
});

export const createMazeSuccess = (data) => ({
  type: CREATE_MAZE_SUCCESS,
  data,
});

export const createMazeFailure = (data) => ({
  type: CREATE_MAZE_FAILURE,
  data,
});

export const getMazeRequest = (data) => ({
  type: GET_MAZE_REQUEST,
  data,
});

export const getMazeSuccess = (data) => ({
  type: GET_MAZE_SUCCESS,
  data,
});

export const getMazeFailure = (data) => ({
  type: GET_MAZE_FAILURE,
  data,
});

export const resetMaze = () => ({
  type: RESET_MAZE,
});
