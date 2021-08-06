import {
  CREATE_MAZE_REQUEST,
  CREATE_MAZE_SUCCESS,
  CREATE_MAZE_FAILURE,
  GET_MAZE_REQUEST,
  GET_MAZE_SUCCESS,
  GET_MAZE_FAILURE,
} from "./maze.types";

const INITIAL_STATE = {
  id: {
    isLoading: false,
    loaded: false,
    data: null,
    error: null,
  },
  content: {
    isLoading: false,
    loaded: false,
    data: null,
    error: null,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_MAZE_REQUEST:
      return {
        ...state,
        id: {
          isLoading: true,
          loaded: false,
          data: null,
          error: null,
        },
      };
    case CREATE_MAZE_SUCCESS:
      return {
        ...state,
        id: {
          isLoading: false,
          loaded: true,
          data: action.data,
          error: null,
        },
      };
    case CREATE_MAZE_FAILURE:
      return {
        ...state,
        id: {
          isLoading: false,
          loaded: true,
          data: null,
          error: action.data,
        },
      };
    case GET_MAZE_REQUEST:
      return {
        ...state,
        content: {
          isLoading: true,
          loaded: false,
          data: null,
          error: null,
        },
      };
    case GET_MAZE_SUCCESS:
      return {
        ...state,
        content: {
          isLoading: false,
          loaded: true,
          data: action.data,
          error: null,
        },
      };
    case GET_MAZE_FAILURE:
      return {
        ...state,
        content: {
          isLoading: false,
          loaded: true,
          data: null,
          error: action.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
