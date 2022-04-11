import React from 'react';
import InputSignup from './InputSignup';

export default function StudentSignUpForm(props) {
  const {
    firstName,
    lastName,
    email,
    password,
    handleFormSubmission,
    onChange,
  } = props;

  const inputDetails = [
    {
      type: 'text',
      name: 'firstName',
      placeholder: 'First Name',
      value: firstName,
    },
    {
      type: 'text',
      name: 'lastName',
      placeholder: 'Last Name',
      value: lastName,
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'Enter your email',
      value: email,
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Create a password',
      autoComplete: 'current-password',
      value: password,
    },
  ];

  return (
    <form onSubmit={handleFormSubmission} className='auth-form-container'>
      <h3>Sign up as a student</h3>
      <h2>Let's begin your next adventure</h2>
      {inputDetails.map((thisInput) => (
        <InputSignup
          type={thisInput.type}
          name={thisInput.name}
          placeholder={thisInput.placeholder}
          value={thisInput.value}
          autoComplete={thisInput.autoComplete}
          onChange={onChange}
        />
      ))}
      <button type='submit' value='Create account' className='auth-button'>
        Create a student account
      </button>
    </form>
  );
}
