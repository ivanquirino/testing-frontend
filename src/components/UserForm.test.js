import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByLabelText,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import nock from 'nock';
import { createStoreInstance } from 'state/store';
import UserForm from './UserForm';

describe('UserForm', () => {
  const mount = () => {
    const store = createStoreInstance();

    render(
      <Provider store={store}>
        <UserForm />
      </Provider>
    );
  };

  beforeAll(() => {
    nock.disableNetConnect();
  });

  describe('Fetch user data error', () => {
    test('Display fetch error message', async () => {
      const scope = nock(/.*/).get('/me').reply(500, null);

      mount();
      await waitFor(() => scope.done());

      const element = await screen.findByText(
        'Erro ao carregar dados do usuário.'
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe('Edit form', () => {
    const currentData = { fullname: 'Test Name', contact: 'Test Contact' };

    beforeEach(async () => {
      const scope = nock(/.*/).get('/me').reply(200, currentData);

      mount();
      await waitFor(() => scope.done());

      await screen.findByDisplayValue(currentData.fullname);
      screen.getByDisplayValue(currentData.contact);
    });

    test('Submit form error', async () => {
      const submitScope = nock(/.*/).put('/me', currentData).reply(500, null);

      fireEvent.click(screen.getByText('Salvar'));

      await screen.findByText('Erro ao atualizar dados do usuário.');
      submitScope.done();
    });

    test('Submit form success', async () => {
      const nameInput = screen.getByLabelText('Nome Completo');
      const contactInput = screen.getByLabelText('Contato');

      const values = { fullname: 'New Name', contact: 'New Contact' };

      fireEvent.change(nameInput, { target: { value: values.fullname } });
      fireEvent.change(contactInput, { target: { value: values.contact } });

      const submitScope = nock(/.*/).put('/me', values).reply(200, null);

      fireEvent.click(screen.getByText('Salvar'));
      await screen.findByText('Dados do usuário atualizados com sucesso.');
      submitScope.done();

      screen.getByDisplayValue(values.fullname);
      screen.getByDisplayValue(values.contact);
    });
  });
});
