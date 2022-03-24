import React from 'react';

export default function StudentSignUpForm(props) {
  const {
    firstName,
    lastName,
    email,
    password,
    handleFormSubmission,
    onChange,
  } = props;

  return (
    <form onSubmit={handleFormSubmission} className='auth-form-container'>
      <h3>Sign up as a student</h3>
      <h2>Let's begin your next adventure</h2>
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
        Create a student account
      </button>
    </form>
  );
}
