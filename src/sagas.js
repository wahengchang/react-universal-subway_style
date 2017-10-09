import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('ACTION_VAR', incrementAsync);
}

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
  ]);
}
