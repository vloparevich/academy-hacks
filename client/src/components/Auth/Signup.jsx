import React, { useState, useEffect } from 'react';
import { signup } from '../../services/auth-service';
import './Auth.css';
import * as USER_HELPERS from '../../utils/userToken';
import * as PATHS from '../../utils/paths';
import { Link } from 'react-router-dom';
import StudentSignUpForm from './StudentSignUpForm';
import TutorSignUpForm from './TutorSignUpForm';
import ErrorMessageModal from './ErrorModal';

export default function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [teachingExperience, setTeachinExperience] = useState('');
  const [response, setResponse] = useState('');
  const [isTutor, setIsTutor] = useState(false);

  const onChangeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    switch (property) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'countryOfOrigin':
        setCountryOfOrigin(value);
        break;
      case 'teachingExperience':
        setTeachinExperience((value) => value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const signingDetails = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      isTutor: isTutor,
      countryOfOrigin: countryOfOrigin,
      teachingExperience: teachingExperience,
    };

    signup(signingDetails).then((res) => {
      // successful signup
      if (!res.status) {
        props.history.push(PATHS.SIGNUPPAGE);
        setResponse((response) => response);
      } else {
        USER_HELPERS.setUserToken(res.data.accessToken);
        props.authenticate(res.data?.user);
        props.history.push(PATHS.HOMEPAGE);
      }
    });
  };

  const handleTutorSelection = () => setIsTutor(() => true);

  const handleStudentSelection = () => setIsTutor(() => false);

  const errorMessageHandler = () => setResponse(() => '');

  return (
    <React.Fragment>
      <ErrorMessageModal
        message={response?.errorMessage}
        resetErrorMessage={errorMessageHandler}
      />
      <div className='auth-container'>
        <ul className='auth-top-bar'>
          <React.Fragment>
            <button
              onClick={handleStudentSelection}
              id={
                isTutor
                  ? 'inactive-student-signup-toggle'
                  : 'active-student-signup-toggle'
              }
            >
              Student
            </button>
            <button
              onClick={handleTutorSelection}
              id={
                isTutor
                  ? 'active-student-signup-toggle'
                  : 'inactive-student-signup-toggle'
              }
            >
              Tutor
            </button>
          </React.Fragment>
        </ul>
        {isTutor ? (
          <TutorSignUpForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            pasword={password}
            handleFormSubmission={handleFormSubmission}
            onChange={onChangeHandler}
          />
        ) : (
          <StudentSignUpForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            pasword={password}
            handleFormSubmission={handleFormSubmission}
            onChange={onChangeHandler}
          />
        )}
      </div>
      <div className='authCreateAccountContainer'>
        Already have an Academy Hacks account?
        <Link to='/auth/login'>
          <b> Log In</b>
        </Link>
      </div>
    </React.Fragment>
  );
}
