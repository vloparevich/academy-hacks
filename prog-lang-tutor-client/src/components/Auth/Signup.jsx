import React, { Component } from 'react';
import { signup } from '../../services/auth-service';
import './Auth.css';
import * as USER_HELPERS from '../../utils/userToken';
import * as PATHS from '../../utils/paths';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isTutor: false,
  };

  changeHandler = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log('THE STATE AFTER CHANGING INPUTS', this.state)
    );
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

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

  handleTutorSelection = () => {
    this.setState({
      isTutor: true,
    });
    console.log({ isTutor: this.state.isTutor });
  };

  handleStudentSelection = () => {
    this.setState({
      isTutor: false,
    });
    console.log({ isTutor: this.state.isTutor });
  };

  render() {
    return (
      <div className='auth-container'>
        <ul className='auth-top-bar'>
          <li onClick={this.handleStudentSelection}>Student</li>
          <li onClick={this.handleTutorSelection}>Tutor</li>
        </ul>
        <form
          onSubmit={this.handleFormSubmission}
          className='auth-form-container'
        >
          {!this.state.isTutor ? (
            <>
              <h3>Welcome to Academy Hacks!</h3>
              <h3>Let's begin your next adventure</h3>
            </>
          ) : (
            <>
              <h3>Would you like to teach at Academy Hacks?</h3>
              <h3>Sign up below!</h3>
            </>
          )}
          <label>First Name</label>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={this.state.firstName}
            onChange={this.changeHandler}
          />

          <label>Last Name</label>
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={this.state.lastName}
            onChange={this.changeHandler}
          />

          <label>Enter your email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={this.state.email}
            onChange={this.changeHandler}
          />

          <label>Create a password</label>
          <input
            type='password'
            name='password'
            placeholder='Create a password'
            autoComplete='current-password'
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button type='submit' value='Create account' className='auth-button'>
            Create account
          </button>
        </form>
      </div>
    );
  }
}
