import React, { Component } from 'react';
import { login } from '../../services/auth-service';
import * as PATHS from '../../utils/paths';
import * as USER_HELPERS from '../../utils/userToken';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
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
      USER_HELPERS.setUserToken(res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push(PATHS.HOMEPAGE);
    });
  };

  render() {
    return (
      <form
        onSubmit={this.handleFormSubmission}
        className='auth-form-container'
      >
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={this.state.email}
          onChange={this.changeHandler}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          autoComplete='current-password'
          value={this.state.password}
          onChange={this.changeHandler}
        />
        <input type='submit' value='Log In' />
      </form>
    );
  }
}
