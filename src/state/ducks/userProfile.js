import { createReducer, createAction } from '@reduxjs/toolkit';
import { path } from 'ramda';
import { PENDING, REJECTED, RESOLVED } from '../constants';

export const initialState = {
  values: {
    fullname: '',
    contact: '',
  },
  status: PENDING,
  error: '',
  success: '',
};

const errorPayload = (defaultMessage) => (error) => {
  let message = defaultMessage;

  const errorMessage = path(['response', 'data', 'errorMessage'], error);
  if (errorMessage) {
    message = error.response.data.errorMessage;
  }

  return { payload: message };
};

export const fetchProfile = createAction('userProfile/fetch/pending');
export const fetchProfileResolved = createAction('userProfile/fetch/resolved');

export const fetchProfileRejected = createAction(
  'userProfile/fetch/rejected',
  errorPayload('Erro ao carregar dados do usuário.')
);

export const updateProfile = createAction('userProfile/update/pending');
export const updateProfileResolved = createAction(
  'userProfile/update/resolved'
);
export const updateProfileRejected = createAction(
  'userProfile/update/rejected',
  errorPayload('Erro ao atualizar dados do usuário.')
);

export default createReducer(initialState, {
  [fetchProfile]: (state) =>
    state.status === PENDING
      ? state
      : { ...state, status: PENDING, error: '', success: '' },
  [fetchProfileResolved]: (state, action) => ({
    ...state,
    status: RESOLVED,
    values: action.payload,
    error: '',
    success: '',
  }),
  [fetchProfileRejected]: (state, action) => ({
    ...state,
    status: REJECTED,
    error: action.payload,
    success: '',
  }),
  [updateProfile]: (state) => ({
    ...state,
    status: PENDING,
    error: '',
    success: '',
  }),
  [updateProfileResolved]: (state, action) => ({
    ...state,
    status: RESOLVED,
    error: '',
    success: 'Dados do usuário atualizados com sucesso.',
    values: action.payload
  }),
  [updateProfileRejected]: (state, action) => ({
    ...state,
    status: REJECTED,
    error: action.payload,
    success: '',
  }),
});
