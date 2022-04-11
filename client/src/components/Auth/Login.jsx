import React, { useState } from 'react';
import { login } from '../../services/auth-service';
import * as PATHS from '../../utils/paths';
import * as USER_HELPERS from '../../utils/userToken';
import './Auth.css';
import { Link } from 'react-router-dom';
import classes from './Auth.module.css';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [attempts, setAttempts] = useState(3);

  const handleFormSubmission = (event) => {
    event.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        // handle not great request
      }
      if (res.data?.accessToken) {
        USER_HELPERS.setUserToken(res.data.accessToken);
        props.authenticate(res.data.user);
        props.location.toBeRedirectedBack?.pathname
          ? props.history.push(props.location.toBeRedirectedBack.pathname)
          : props.history.push(PATHS.HOMEPAGE);
      } else {
        setInvalidCredentials(true);
      }
    });
  };

  return (
    <div>
      <div className='auth-container'>
        <h2>Sign in to Academy Hacks</h2>
        <form onSubmit={handleFormSubmission} className='auth-form-container'>
          {/* <label>Enter your email</label> */}
          <input
            className={classes['signup-input']}
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label>Enter your password</label> */}
          <input
            className={classes['signup-input']}
            type='password'
            name='password'
            placeholder='Enter your password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {invalidCredentials && attempts ? (
            <div className='invalidCredentials'>
              <p>You have entered an invalid username or password</p>
              <p>Attempts left: {attempts}</p>
            </div>
          ) : (
            <></>
          )}
          {attempts ? (
            <button
              onClick={() => setAttempts(attempts - 1)}
              type='submit'
              value='Log In'
              className='auth-button'
            >
              Log In
            </button>
          ) : (
            <div className='invalidCredentials'>
              <p>You’ve reached the maximum logon attempts.</p>
              <p>Exit your browser and try again.</p>
            </div>
          )}
        </form>
      </div>
      <div className='authCreateAccountContainer'>
        New to Academy Hacks?{' '}
        <Link to='/auth/signup'>
          <b>Create an account</b>
        </Link>
      </div>
    </div>
  );
}
