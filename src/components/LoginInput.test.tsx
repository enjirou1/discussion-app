import React from 'react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import LoginInput from './LoginInput';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn().mockReturnValue({ authUser: { loading: false, error: '' } }),
  useDispatch: vi.fn()
}));

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'abc@gmail.com');

    // assert
    expect(emailInput).toHaveValue('abc@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, '1234');

    // assert
    expect(passwordInput).toHaveValue('1234');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'abc@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, '1234');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({ email: 'abc@gmail.com', password: '1234' });
  });
});