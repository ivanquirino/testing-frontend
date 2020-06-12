import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userProfile from './ducks/userProfile';
import userProfileSaga from './saga/userProfile';

export const createStoreInstance = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ];

  const store = configureStore({
    reducer: { userProfile },
    devTools: true,
    middleware,
  });

  sagaMiddleware.run(userProfileSaga);

  return store;
};

export default createStoreInstance();