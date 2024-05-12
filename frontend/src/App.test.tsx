import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('socket.io-client', () => {
  return jest.fn(() => {
    return {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    };
  });
});

test('renders Public Screen', () => {
  render(<App />);
  const screenName = screen.getByText(/Public Screen/i);
  expect(screenName).toBeInTheDocument();
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('renders Await Screen or Secure Screen', async () => {
  render(<App />);
  const socket = require('socket.io-client')();
  const buttonElement = screen.getByRole('button');
  let screenName = screen.queryByText(/Public Screen/i);

  userEvent.click(buttonElement);

  await socket && socket.on('screenAccessDenied', () => {
    screenName = screen.queryByText(/Public Screen/i);
  });
  await socket && socket.on('screenAccessGranted', () => {
    screenName = screen.queryByText(/Secure Screen/i);
  });

  expect(screenName).toBeInTheDocument();
});
