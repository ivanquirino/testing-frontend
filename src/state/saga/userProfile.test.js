import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  fetchProfileResolved,
  fetchProfileRejected,
  updateProfile,
  updateProfileResolved,
  updateProfileRejected,
} from 'state/ducks/userProfile';
import { fetchProfileSaga, updateProfileSaga } from './userProfile';

describe('userProfile sagas', () => {
  describe('fetchProfileSaga', () => {
    test('on success', () => {
      const data = { fullName: 'Test User', contact: 'Test Contact' };

      return expectSaga(fetchProfileSaga)
        .provide([[matchers.call([axios, 'get'], '/me'), { data }]])
        .call([axios, 'get'], '/me')
        .put(fetchProfileResolved(data))
        .run();
    });

    test('on error', () => {
      const error = new Error('Test Error');

      return expectSaga(fetchProfileSaga)
        .provide([[matchers.call([axios, 'get'], '/me'), throwError(error)]])
        .call([axios, 'get'], '/me')
        .put(fetchProfileRejected(error))
        .run();
    });
  });

  describe('updateProfileSaga', () => {
    const data = { fullname: 'Updated User', contact: 'Updated Contact' };
    
    test('on success', () => {      
      return expectSaga(updateProfileSaga, updateProfile(data))
        .provide([[matchers.call([axios, 'put'], '/me', data)]])
        .call([axios, 'put'], '/me', data)
        .put(updateProfileResolved(data))
        .run();
    });

    test('on error', () => {
      const error = new Error('Test Error');

      return expectSaga(updateProfileSaga, updateProfile(data))
        .provide([[matchers.call([axios, 'put'], '/me', data), throwError(error)]])
        .call([axios, 'put'], '/me', data)
        .put(updateProfileRejected(error))
        .run();
    });
  });
});
