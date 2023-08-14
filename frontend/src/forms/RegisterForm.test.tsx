// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import RegisterForm from './RegisterForm';
// describe('RegisterForm', () => {
//      test('should display error message when email is invalid', async () => {
//          const { getByLabelText, getByText } = render(<RegisterForm />);
//          const emailInput = getByLabelText('email');
//          const submitButton = getByText('submit');

//         fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
//         fireEvent.click(submitButton);

//       await waitFor(() => {
//        const errorMessage = getByText('Invalid email');
//        expect(errorMessage).toBeInTheDocument();
//  });
// });

//  test('should display error message when passwords do not match', async () => {
//     const { getByLabelText, getByText } = render(<RegisterForm />);
//     const passwordInput = getByLabelText('password');
//      const confirmPasswordInput = getByLabelText('confirm password');
//      const submitButton = getByText('Submit');

//      fireEvent.change(passwordInput, { target: { value: 'password123' } });
//      fireEvent.change(confirmPasswordInput, { target: { value: 'notmatching' } });
//      fireEvent.click(submitButton);
//      await waitFor(() => {
//         const errorMessage = getByText('Passwords do not match');
//         expect(errorMessage).toBeInTheDocument();
//     });
// });
//    test('should submit form when all fields are valid', async () => {
//     const { getByLabelText, getByText } = render(<RegisterForm />);
//     const emailInput = getByLabelText('email');
//     const usernameInput = getByLabelText('username');
//     const passwordInput = getByLabelText('password');
//     const confirmPasswordInput = getByLabelText('confirmPassword');
//     const submitButton = getByText('submit');

//    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
//    fireEvent.change(usernameInput, { target: { value: 'exampleuser' } });
//    fireEvent.change(passwordInput, { target: { value: 'password123' } });
//    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
//    fireEvent.click(submitButton);

//    await waitFor(() => {
//      // make assertion that the form submitted successfully
// });
//  });
// });

import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RegisterForm from "./RegisterForm"
test("render product filter", async () => {
  render(<RegisterForm />)
  fireEvent.change(screen.getByTestId("input1"), { target: { value: "exampleuser" } })
  fireEvent.change(screen.getByTestId("input2"), { target: { value: "valid-email@example.com" } })
  fireEvent.change(screen.getByTestId("input3"), { target: { value: "password123" } })
  fireEvent.change(screen.getByTestId("input4"), { target: { value: "password123" } })
})
