import { put, takeEvery, call, select } from "redux-saga/effects";
import {
  setMazeAsync,
  setMazeSuccess,
  setMazeFailure,
} from "../redux/Maze/maze.actions";
import { getMaze, fetchCreate } from "../utils/api";

function* getMazeSaga(action) {
  try {
    const maze = yield select((state) => state.maze);
    const mazeId = yield select((state) => state.mazeId);
    yield put(setMazeAsync(maze));
    let response = yield call(getMaze(mazeId));
    yield put(setMazeSuccess(response));
  } catch (err) {
    yield put(setMazeFailure(err));
  }
}

function* watchGetMazeSaga() {
  yield takeEvery("SET_MAZE", getMazeSaga);
}

function* createMazeSaga(action) {
  try {
    const mazeId = yield call(fetchCreate, action.payload.mazeId);
    yield put({ type: "MAZE_ID_SUCCEEDED", mazeId: mazeId });
  } catch (e) {
    yield put({ type: "MAZE_ID_FAILED", message: e.message });
  }
}

export default function* watchCreateMazeSaga() {
  yield takeEvery("SET_MAZE_ID", createMazeSaga);
}
