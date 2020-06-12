import reducer, {
  initialState,
  fetchProfile,
  fetchProfileResolved,
  fetchProfileRejected,
  updateProfile,
  updateProfileResolved,
  updateProfileRejected,
} from './userProfile';
import { PENDING, RESOLVED, REJECTED } from '../constants';

describe('User Profile Reducer', () => {
  describe('fetchProfile request', () => {
    describe('fetchProfile', () => {
      test('handle fetchProfile from initial state', () => {
        const state = reducer(initialState, fetchProfile());

        expect(state).toBe(initialState);
      });

      test('handle fetchProfile from previous state', () => {
        const previousState = {
          status: RESOLVED,
          values: { fullname: 'João', contact: 'ZapZap' },
          success: 'success message',
          error: 'error message',
        };
        const state = reducer(previousState, fetchProfile());

        expect(state).toEqual({
          ...previousState,
          status: PENDING,
          error: '',
          success: '',
        });
      });
    });

    describe('fetchProfile result', () => {
      const previousState = {
        values: { fullname: 'test', contact: 'test contact' },
        status: REJECTED,
        error: 'test error',
        success: 'test success',
      };

      test('handle fetchProfileResolved from previous state', () => {
        const payload = { fullname: 'João', contact: 'ZapZap' };

        const state = reducer(previousState, fetchProfileResolved(payload));

        expect(state).toEqual({
          ...initialState,
          status: RESOLVED,
          values: payload,
        });
      });

      describe('fetchProfileRejected', () => {
        test('handle fetchProfileRejected with unkown error', () => {
          const payload = new Error('Test Error');
          payload.response = { status: 500 };

          const state = reducer(previousState, fetchProfileRejected(payload));

          expect(state).toEqual({
            ...previousState,
            status: REJECTED,
            error: 'Erro ao carregar dados do usuário.',
            success: '',
          });
        });

        test('handle fetchProfileRejected with known error', () => {
          const payload = new Error('Test Error');
          payload.response = {
            status: 404,
            data: { errorCode: '11', errorMessage: 'Usuário não encontrado' },
          };
          const state = reducer(previousState, fetchProfileRejected(payload));

          expect(state).toEqual({
            ...previousState,
            status: REJECTED,
            error: payload.response.data.errorMessage,
            success: '',
          });
        });
      });
    });
  });

  describe('updateProfile request', () => {
    test('handle updateProfile', () => {
      const values = { fullname: 'Update User', contact: 'Update Contact' };
      const previousState = {
        error: 'test error',
        success: 'test success',
        status: RESOLVED,
        values: { fullname: 'Current User', contact: 'Current Contact' },
      };
      const state = reducer(previousState, updateProfile(values));

      expect(state).toEqual({
        ...previousState,
        status: PENDING,
        error: '',
        success: '',
      });
    });

    describe('updateProfile result', () => {
      const previousState = {
        error: 'testerror',
        success: '',
        values: { fullname: 'current user', contact: 'current contact' },
        status: PENDING,
      };

      test('handle updateProfileResolved', () => {
        const payload = {
          fullname: 'Updated User',
          contact: 'Updated Contact',
        };
        const state = reducer(previousState, updateProfileResolved(payload));

        expect(state).toEqual({          
          success: 'Dados do usuário atualizados com sucesso.',
          error: '',
          status: RESOLVED,
          values: payload,
        });
      });

      test('handle updateProfileRejected', () => {
        const payload = new Error('Test Error');
        const state = reducer(previousState, updateProfileRejected(payload));

        expect(state).toEqual({
          ...previousState,
          error: 'Erro ao atualizar dados do usuário.',
          success: '',
          status: REJECTED,
        });
      });
    });
  });
});
