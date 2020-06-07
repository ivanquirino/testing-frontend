import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
  describe('Initial value by props', () => {
    test('Default value 0', () => {
      render(<Counter />);

      const view = screen.getByLabelText('Contador');
      expect(view).toHaveDisplayValue(/^0$/);
    });

    test('Positive integer', () => {
      render(<Counter initialValue={5} />);

      const view = screen.getByLabelText('Contador');
      expect(view).toHaveDisplayValue(/^5$/);
    });

    test('Negative integer', () => {
      render(<Counter initialValue={-1} />);

      const view = screen.getByLabelText('Contador');
      expect(view).toHaveDisplayValue(/^0$/);
    });

    test('Alphabetic characters', () => {
      render(<Counter initialValue="aa" />);

      const view = screen.getByLabelText('Contador');
      expect(view).toHaveDisplayValue(/^0$/);
    });

    test('Float number', () => {
      render(<Counter initialValue={20.3} />);

      const view = screen.getByLabelText('Contador');
      expect(view).toHaveDisplayValue(/^20$/);
    });
  });

  describe('User interaction', () => {
    beforeEach(() => {
      render(<Counter />);
    });

    describe('Increment and decrement', () => {
      test('Increment once', () => {
        const view = screen.getByText('Incrementa');
        fireEvent.click(view);

        expect(screen.getByLabelText('Contador')).toHaveDisplayValue(/^1$/);
      });

      test('Decrement once', () => {
        const view = screen.getByText('Decrementa');
        fireEvent.click(view);

        expect(screen.getByLabelText('Contador')).toHaveDisplayValue(/^0$/);
      });

      test('Increment and decrement once', () => {
        const increment = screen.getByText('Incrementa');
        fireEvent.click(increment);

        const counter = screen.getByLabelText('Contador');
        expect(counter).toHaveDisplayValue(/^1$/);

        const decrement = screen.getByText('Decrementa');
        fireEvent.click(decrement);

        expect(counter).toHaveDisplayValue(/^0$/);
      });

      test('Increment 5 tives and reset', () => {
        const increment = screen.getByText('Incrementa');

        for (let i = 0; i < 5; i++) {
          fireEvent.click(increment);
        }

        const counter = screen.getByLabelText('Contador');
        expect(counter).toHaveDisplayValue(/^5$/);

        const reset = screen.getByTitle('Reset Button');
        fireEvent.click(reset);

        expect(counter).toHaveDisplayValue(/^0$/);
      });
    });

    describe('Inserting a value', () => {
      test('Insert different values for the counter', () => {
        const counter = screen.getByLabelText('Contador');

        fireEvent.change(counter, { target: { value: '10' } });

        expect(counter).toHaveDisplayValue(/^10$/);

        fireEvent.change(counter, { target: { value: 'a' } });

        expect(counter).toHaveDisplayValue(/^$/);

        fireEvent.change(counter, { target: { value: '-1' } });

        expect(counter).toHaveDisplayValue(/^$/);

        fireEvent.change(counter, { target: { value: '0' } });

        expect(counter).toHaveDisplayValue(/^0$/);
      });
    });   
  });

   describe('With initialValue prop set', () => {     
     test('Decrement twice and reset', () => {
       render(<Counter initialValue={5} />);

       const counter = screen.getByLabelText('Contador');

       const decrement = screen.getByText('Decrementa');

       for (let i = 0; i < 2; i++) {
         fireEvent.click(decrement);
       }

       expect(counter).toHaveDisplayValue(/^3$/);

       const reset = screen.getByTitle('Reset Button');
       fireEvent.click(reset);

       expect(counter).toHaveDisplayValue(/^5$/);
     });
   });
});
