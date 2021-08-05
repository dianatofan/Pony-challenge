import { SET_MAZE_ID, SET_MAZE } from "./maze.types";

const INITIAL_STATE = {
  mazeId: null,
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
    default:
      return state;
  }
};

export default reducer;
