import { put, takeEvery, call, select } from "redux-saga/effects";
import {
  setMazeAsync,
  setMazeSuccess,
  setMazeFailure,
  createMaze,
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

function* createMazeSaga(payload) {
  try {
    const response = yield call(fetchCreate, payload.data);
    const content = yield response.json();
    yield put(createMaze.success(content));
  } catch (e) {
    console.log(e.message);
    yield put(createMaze.failure(e.message));
  }
}

export default function* watchCreateMazeSaga() {
  yield takeEvery(createMaze.REQUEST, createMazeSaga);
}
