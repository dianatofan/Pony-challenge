import {
  CREATE_MAZE_REQUEST,
  CREATE_MAZE_SUCCESS,
  CREATE_MAZE_FAILURE,
  GET_MAZE_REQUEST,
  GET_MAZE_SUCCESS,
  GET_MAZE_FAILURE,
  RESET_MAZE,
} from "./maze.types";

const INITIAL_STATE = {
  mazeId: null,
  mazeContent: null,
  isLoading: false,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_MAZE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_MAZE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mazeId: action.data,
      };
    case CREATE_MAZE_FAILURE:
      return {
        ...state,
        isLoading: false,
        mazeId: null,
        error: action.data,
      };
    case GET_MAZE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MAZE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mazeContent: action.data,
      };
    case GET_MAZE_FAILURE:
      return {
        ...state,
        isLoading: false,
        mazeContent: null,
        error: action.data,
      };
    case RESET_MAZE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
