import {
  SET_MAZE_ID,
  SET_MAZE_SUCCESS,
  SET_MAZE,
  SET_MAZE_ASYNC,
  CREATE_MAZE_REQUEST,
  CREATE_MAZE_SUCCESS,
  CREATE_MAZE_FAILURE,
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
//
// export const createMazeRequest = (data) => ({
//   type: CREATE_MAZE_REQUEST,
//   data,
// });
//
// export const createMazeSuccess = (data) => ({
//   type: CREATE_MAZE_SUCCESS,
//   data,
// });
//
// export const createMazeFailure = (data) => ({
//   type: CREATE_MAZE_FAILURE,
//   data,
// });

const actionCreator = (action) => {
  const values = ["SUCCESS", "FAILURE", "REQUEST"];
  return values.reduce((acc, value) => {
    const type = `${action}_${value}`;
    acc[value] = type;
    acc[value.toLowerCase()] = (data) => ({
      type,
      data,
    });
    return acc;
  }, {});
};

export const createMaze = actionCreator("CREATE_MAZE");

console.log(createMaze);
