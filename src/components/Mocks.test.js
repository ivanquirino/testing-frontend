import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Mocks from './Mocks';

jest.mock('react-chartjs-2', () => {
  const original = jest.requireActual('react-chartjs-2');
  return { ...original, Line: (props) => <div {...props}>LineChart</div> };
});

const getSpy = jest.spyOn(axios, 'get');

describe('Mocks Example', () => {
  test('render correctly', async () => {
    getSpy.mockResolvedValue({
      data: {
        fullname: 'Test User',
      },
    });

    render(<Mocks />);

    const name = await screen.findByText('Nome: Test User');
    
    expect(name).toBeInTheDocument();
    expect(screen.getByText('LineChart')).toBeInTheDocument();
  });
});
