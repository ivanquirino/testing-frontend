import { all, takeEvery, put, call } from 'redux-saga/effects';
import {
  fetchProfile,
  fetchProfileResolved,
  fetchProfileRejected,
  updateProfileRejected,
  updateProfileResolved,
  updateProfile,
} from 'state/ducks/userProfile';
import axios from 'axios';

export function* fetchProfileSaga() {
  try {
    const response = yield call([axios, 'get'], '/me');
    yield put(fetchProfileResolved(response.data));
  } catch (e) {
    yield put(fetchProfileRejected(e));
  }
}

export function* updateProfileSaga({ payload }) {
  try {
    yield call([axios, 'put'], '/me', payload);
    yield put(updateProfileResolved(payload));
  } catch (e) {
    yield put(updateProfileRejected(e));
  }
}

export default function* watcher() {
  try {
    yield all([
      takeEvery(fetchProfile.type, fetchProfileSaga),
      takeEvery(updateProfile.type, updateProfileSaga),
    ]);
  } catch (e) {
    console.error(e);
  }
}
