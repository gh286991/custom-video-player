import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders greeting', () => {
  render(<App />);
  const greetingElement = screen.getByText(/hello, react 18 with webpack and typescript!/i);
  expect(greetingElement).toBeInTheDocument();
});
