import React from 'react';

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

  return (
    <form onSubmit={handleFormSubmission} className='auth-form-container'>
      <h3>Sign up as a programming tutor</h3>
      <h2>Start a rewarding career!</h2>
      <label>First Name</label>
      <input
        type='text'
        name='firstName'
        placeholder='First Name'
        value={firstName}
        onChange={onChange}
      />

      <label>Last Name</label>
      <input
        type='text'
        name='lastName'
        placeholder='Last Name'
        value={lastName}
        onChange={onChange}
      />

      <label>How many years have you been teaching?</label>
      <input
        type='number'
        name='teachingExperience'
        min='1'
        // placeholder="How many years have you been teaching?"
        value={teachingExperience}
        onChange={onChange}
      />

      <label>What country are you from?</label>
      <input
        type='text'
        name='countryOfOrigin'
        placeholder='What country are you from?'
        value={countryOfOrigin}
        onChange={onChange}
      />

      <label>Enter your email</label>
      <input
        type='email'
        name='email'
        placeholder='Enter your email'
        value={email}
        onChange={onChange}
      />

      <label>Create a password</label>
      <input
        type='password'
        name='password'
        placeholder='Create a password'
        autoComplete='current-password'
        value={password}
        onChange={onChange}
      />
      <button type='submit' value='Create account' className='auth-button'>
        Create a tutor account
      </button>
    </form>
  );
}
