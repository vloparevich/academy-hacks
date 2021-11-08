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
    countryOfOrigin: '',
    teachingExperience: '',
    isTutor: false,
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const signingDetails = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isTutor: this.state.isTutor,
      countryOfOrigin: this.state.countryOfOrigin,
      teachingExperience: this.state.teachingExperience,
    };

    signup(signingDetails).then((res) => {
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
  };

  handleStudentSelection = () => {
    this.setState({
      isTutor: false,
    });
  };

  render() {
    return (
      <div className='auth-container'>
        <ul className='auth-top-bar'>
          {!this.state.isTutor ? (
            <>
              <button
                onClick={this.handleStudentSelection}
                id='active-student-signup-toggle'
              >
                Student
              </button>
              <button
                onClick={this.handleTutorSelection}
                id='inactive-student-signup-toggle'
              >
                Tutor
              </button>
            </>
          ) : (
            <>
              <button
                onClick={this.handleStudentSelection}
                id='inactive-student-signup-toggle'
              >
                Student
              </button>
              <button
                onClick={this.handleTutorSelection}
                id='active-tutor-signup-toggle'
              >
                Tutor
              </button>
            </>
          )}
        </ul>
        <form
          onSubmit={this.handleFormSubmission}
          className='auth-form-container'
        >
          {!this.state.isTutor ? (
            <>
              <h3>Sign up as a student</h3>
              <h2>Let's begin your next adventure</h2>
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
              <button
                type='submit'
                value='Create account'
                className='auth-button'
              >
                Create a student account
              </button>
            </>
          ) : (
            <>
              <h3>Sign up as a programming tutor</h3>
              <h2>Start a rewarding career!</h2>
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

              <label>How many years have you been teaching?</label>
              <input
                type='number'
                name='teachingExperience'
                min='1'
                // placeholder="How many years have you been teaching?"
                value={this.state.teachingExperience}
                onChange={this.changeHandler}
              />

              <label>What country are you from?</label>
              <input
                type='text'
                name='countryOfOrigin'
                placeholder='What country are you from?'
                value={this.state.countryOfOrigin}
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
              <button
                type='submit'
                value='Create account'
                className='auth-button'
              >
                Create a tutor account
              </button>
            </>
          )}
        </form>
      </div>
    );
  }
}
