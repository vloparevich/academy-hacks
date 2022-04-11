import React from 'react';
import InputSignup from './InputSignup';

export default function TutorSignUpForm(props) {
  const {
    firstName,
    lastName,
    teachingExperience,
    countryOfOrigin,
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
      type: 'number',
      name: 'teachingExperience',
      min: '1',
      placeholder: 'How many years have you been teaching?',
      value: teachingExperience,
    },
    {
      type: 'text',
      name: 'countryOfOrigin',
      placeholder: 'What country are you from?',
      value: countryOfOrigin,
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
      <h3>Sign up as a programming tutor</h3>
      <h2>Start a rewarding career!</h2>
      {inputDetails.map((thisInput) => (
        <InputSignup
          type={thisInput.type}
          name={thisInput.name}
          placeholder={thisInput.placeholder}
          value={thisInput.value}
          onChange={onChange}
          autoComplete={thisInput.autoComplete}
          min={thisInput.min}
        />
      ))}
      <button type='submit' value='Create account' className='auth-button'>
        Create a tutor account
      </button>
    </form>
  );
}
