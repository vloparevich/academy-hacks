import React, { Component, useState, useEffect } from 'react';
import { signup } from '../../services/auth-service';
import './Auth.css';
import * as USER_HELPERS from '../../utils/userToken';
import * as PATHS from '../../utils/paths';
import { Link } from 'react-router-dom';
import StudentSignUpForm from './StudentSignUpForm';
import TutorSignUpForm from './TutorSignUpForm';
import ErrorMessageModal from './ErrorModal';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    countryOfOrigin: '',
    teachingExperience: '',
    isTutor: false,
    response: '',
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
      if (!res.status) {
        this.props.history.push(PATHS.SIGNUPPAGE);
        this.setState({
          response: res,
        });
      } else {
        USER_HELPERS.setUserToken(res.data.accessToken);
        this.props.authenticate(res.data?.user);
        this.props.history.push(PATHS.HOMEPAGE);
      }
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

  errorMessageHandler = () => {
    this.setState({ response: '' });
  };

  render() {
    return (
      <React.Fragment>
        <ErrorMessageModal
          message={this.state.response?.errorMessage}
          resetErrorMessage={this.errorMessageHandler}
        />
        <div className='auth-container'>
          <ul className='auth-top-bar'>
            <>
              <button
                onClick={this.handleStudentSelection}
                id={
                  this.state.isTutor
                    ? 'inactive-student-signup-toggle'
                    : 'active-student-signup-toggle'
                }
              >
                Student
              </button>
              <button
                onClick={this.handleTutorSelection}
                id={
                  this.state.isTutor
                    ? 'active-student-signup-toggle'
                    : 'inactive-student-signup-toggle'
                }
              >
                Tutor
              </button>
            </>
          </ul>
          {this.state.isTutor ? (
            <TutorSignUpForm
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              pasword={this.state.password}
              handleFormSubmission={this.handleFormSubmission}
              onChange={this.changeHandler}
            />
          ) : (
            <StudentSignUpForm
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              pasword={this.state.password}
              handleFormSubmission={this.handleFormSubmission}
              onChange={this.changeHandler}
            />
          )}
        </div>
        <div className='authCreateAccountContainer'>
          Already have an Academy Hacks account?{' '}
          <Link to='/auth/login'>
            <b>Log In</b>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
