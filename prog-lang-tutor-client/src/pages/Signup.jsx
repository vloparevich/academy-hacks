import React, { Component } from 'react';
import { signup } from '../services/auth';
import './auth.css';
import * as PATHS from '../utils/paths';
import * as USER_HELPERS from '../utils/userToken';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    // console.log(credentials.username, credentials.password);

    signup(credentials).then((res) => {
      // successful signup
      console.log(res);
      if (!res.status) {
        // unsuccessful signup
      }
      console.log('the token', { token: res.data });

      USER_HELPERS.setUserToken(res.data.accessToken);

      console.log({ token: USER_HELPERS.getUserToken(res.data.accessToken) });

      this.props.authenticate(res.data.user);
      this.props.history.push(PATHS.HOMEPAGE);
    });
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmission} className='auth__form'>
          <label htmlFor='input-username'>Email</label>
          <input
            id='input-username'
            type='text'
            name='email'
            placeholder='Text'
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor='input-password'>Password</label>
          <input
            id='input-password'
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            minLength='8'
          />

          {this.state.error && (
            <div className='error-block'>
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}

          <button className='button__submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}