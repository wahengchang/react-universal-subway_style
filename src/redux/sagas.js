/* eslint-disable no-multiple-empty-lines */

import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import urlencode from 'urlencode';
import { port, host } from '../appConfig';

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('ACTION_VAR', incrementAsync);
}

export function* createLoginGoogle() {
  const windowLoc = window.location.href;
  try {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'yoursecret');
    let response = null;
    if (port) {
      const reqURL = `http://${host}:${port}/api/signup/google/${urlencode(windowLoc)}`;
      response = yield call(axios.get, reqURL, { headers: { authorization: token } });
    } else {
      const reqURL = `/api/signup/google/${urlencode(windowLoc)}`;
      response = yield call(axios.get, reqURL, { headers: { authorization: token } });
    }
    window.location.href = response.data;
    console.log(response.data); // yield put({ type: 'FETCHED_JWT', data: response.data.msg });
  } catch (err) {
    console.log(err);
    console.log('Google Login did not work');
  }
}

export function* watchGoogleLogin() {
  yield takeEvery('JWT_VERIFY', createLoginGoogle);
}

export function* createLesson() {
  try {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'yoursecret');
    let response = null;
    if (port) {
      const reqURL = `http://${host}:${port}/api/data`;
      response = yield call(axios.get, reqURL, { headers: { authorization: token } });
    } else {
      const reqURL = '/api/data';
      response = yield call(axios.get, reqURL, { headers: { authorization: token } });
    }
    yield put({ type: 'FETCHED_JWT', data: response.data.msg });
  } catch (err) {
    console.log(err);
    console.log('saga error API did not work');
  }
}

export function* watchCreateLesson() {
  yield takeEvery('ACTION_VAR', createLesson);
}

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchCreateLesson(),
    watchGoogleLogin(),
  ]);
}
