import { put, takeEvery, call, fork, delay } from "redux-saga/effects";
import {
  setMazeAsync,
  setMazeSuccess,
  setMazeFailure,
  createMaze,
  getMaze,
} from "../redux/Maze/maze.actions";
import { fetchCreate } from "../utils/api";

// function* getMazeSaga(action) {
//   try {
//     const maze = yield select((state) => state.maze);
//     const mazeId = yield select((state) => state.mazeId);
//     yield put(setMazeAsync(maze));
//     let response = yield call(getMaze(mazeId));
//     yield put(setMazeSuccess(response));
//   } catch (err) {
//     yield put(setMazeFailure(err));
//   }
// }

// function* watchGetMazeSaga() {
//   yield takeEvery("SET_MAZE", getMazeSaga);
// }

function* createMazeSaga(payload) {
  try {
    const response = yield call(fetchCreate, payload.data);
    const content = yield response.json();
    yield put(createMaze.success(content["maze_id"]));
  } catch (e) {
    yield put(createMaze.failure(e.message));
  }
}

function* watchCreateMazeSaga() {
  yield takeEvery(createMaze.REQUEST, createMazeSaga);
}

function* getMazeSaga(payload) {
  try {
    const response = yield call(getMaze, payload.data);
    yield put(getMaze.success(response));
  } catch (e) {
    yield put(getMaze.failure(e.message));
  }
}

function* watchGetMazeSaga() {
  yield takeEvery(getMaze.REQUEST, getMazeSaga);
}

/*
const sagas = [
  fetchUserSaga,
  fetchStyleSaga,
]; */

function* fetchAll() {
  const task1 = yield fork(createMaze.REQUEST, createMazeSaga);
  const task2 = yield fork(getMaze.REQUEST, getMazeSaga);
  yield delay(1000);
}

export default function* rootSaga() {
  try {
    yield call(fetchAll);
  } catch (e) {
    // handle fetchAll errors
  }

  // const createMaze = yield call(createMaze.REQUEST, createMazeSaga);
  // const getMaze = yield call(getMaze.REQUEST, getMazeSaga);

  // yield all([
  //   yield takeEvery(createMaze.REQUEST, createMazeSaga),
  //   yield takeEvery(getMaze.REQUEST, getMazeSaga),
  // ]);
}
