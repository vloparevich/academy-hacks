import React, { Component } from 'react';
import { login } from '../../services/auth-service';
import * as PATHS from '../../utils/paths';
import * as USER_HELPERS from '../../utils/userToken';
import './Auth.css';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    attempts: 3,
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        // handle not great request
      }
      if (res.data?.accessToken) {
        USER_HELPERS.setUserToken(res.data.accessToken);
        this.props.authenticate(res.data.user);
        this.props.history.push(PATHS.HOMEPAGE);
      } else {
        this.setState({ invalidCredentials: true });
      }
    });
  };

  handleAttempts = () => {
    this.setState({ attempts: this.state.attempts - 1 });
  };

  render() {
    return (
      <div>
        <div className='auth-container'>
          <h2>Sign in to Academy Hacks</h2>
          <form
            onSubmit={this.handleFormSubmission}
            className='auth-form-container'
          >
            <label>Enter your email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={this.state.email}
              onChange={this.changeHandler}
            />

            <label>Enter your password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              autoComplete='current-password'
              value={this.state.password}
              onChange={this.changeHandler}
            />
            {this.state.invalidCredentials && this.state.attempts ? (
              <div className='invalidCredentials'>
                <p>You have entered an invalid username or password</p>
                <p>Attempts left: {this.state.attempts}</p>
              </div>
            ) : (
              <></>
            )}
            {this.state.attempts ? (
              <button
                onClick={this.handleAttempts}
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
      </div>
    );
  }
}
