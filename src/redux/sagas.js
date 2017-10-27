import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { port, host } from '../appConfig';

export function* fetchData() {
  try {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'yoursecret');
    let response = null;
    if (port) {
      const reqURL = `http://${host}:${port}/api/data`;
      response = yield call(axios.get, reqURL, { headers: { authorization: token, 'Content-Type': 'application/json' } });
    } else {
      const reqURL = '/api/data';
      response = yield call(axios.get, reqURL, { headers: { authorization: token, 'Content-Type': 'application/json' } });
    }
    yield put({ type: 'FETCHED_JWT', data: response.data.msg });
  } catch (err) {
    console.log(err);
    console.log('saga API data did not work. Retry fetching it');
  }
}
export function* watchFetchData() {
  yield takeEvery('FETCH_DATA', fetchData);
}

export default function* rootSaga() {
  yield all([
    watchFetchData(),
  ]);
}
