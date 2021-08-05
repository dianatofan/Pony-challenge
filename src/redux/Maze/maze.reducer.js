import {
  SET_MAZE_ID,
  SET_MAZE,
  SET_MAZE_ASYNC,
  SET_MAZE_SUCCESS,
  SET_MAZE_FAILURE,
} from "./maze.types";

const INITIAL_STATE = {
  mazeId: null,
  setMazeSuccess: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAZE_ID:
      return {
        ...state,
        mazeId: action.payload.mazeId,
      };
    case SET_MAZE:
      return {
        ...state,
        maze: action.payload.maze,
      };
    case SET_MAZE_ASYNC:
      return {
        ...state,
        maze: action.payload.maze,
      };
    case SET_MAZE_SUCCESS:
      return {
        ...state,
        maze: action.payload.setMazeSuccess,
      };
    case SET_MAZE_FAILURE:
      return {
        ...state,
        maze: action.payload.setMazeSuccess,
      };
    default:
      return state;
  }
};

export default reducer;
