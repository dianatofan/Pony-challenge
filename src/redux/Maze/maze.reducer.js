import {
  SET_MAZE_ID,
  SET_MAZE,
  SET_MAZE_ASYNC,
  SET_MAZE_SUCCESS,
  SET_MAZE_FAILURE,
} from "./maze.types";

import { createMaze } from "./maze.actions";

// const INITIAL_STATE = {
//   mazeId: null,
//   setMazeSuccess: null,
// };

// const initialAsyncState = {
//   isLoading: false,
//   loaded: false,
//   data: null,
//   error: null,
// };
const INITIAL_STATE = {
  mazeId: {
    isLoading: false,
    loaded: false,
    data: null,
    error: null,
  },
};

const reducerHandler = (state, action, actionHandler) => {
  switch (action.type) {
    case actionHandler.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionHandler.SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.data,
        error: null,
      };
    case actionHandler.FAILURE:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.data,
        data: null,
      };
    default:
      return state;
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  console.log(action.data);
  switch (action.type) {
    case createMaze.REQUEST:
    case createMaze.SUCCESS:
    case createMaze.FAILURE:
      return {
        ...state,
        mazeId: reducerHandler(state.mazeId, action, createMaze),
      };
    default:
      return state;
    // switch (action.type) {
    //   case SET_MAZE_ID:
    //     return {
    //       ...state,
    //       mazeId: action.payload.mazeId,
    //     };
    //   case SET_MAZE:
    //     return {
    //       ...state,
    //       maze: action.payload.maze,
    //     };
    //   case SET_MAZE_ASYNC:
    //     return {
    //       ...state,
    //       maze: action.payload.maze,
    //     };
    //   case SET_MAZE_SUCCESS:
    //     return {
    //       ...state,
    //       maze: action.payload.setMazeSuccess,
    //     };
    //   case SET_MAZE_FAILURE:
    //     return {
    //       ...state,
    //       maze: action.payload.setMazeSuccess,
    //     };
    //   case CREATE_MAZE_SUCCESS:
    //     return {
    //       ...state,
    //       mazeId: action.payload.mazeId,
    //     };
    //   case CREATE_MAZE_FAILURE:
    //     return {
    //       ...state,
    //       mazeId: action.payload.err,
    //     };
    //   default:
    //     return state;
  }
};

export default reducer;
