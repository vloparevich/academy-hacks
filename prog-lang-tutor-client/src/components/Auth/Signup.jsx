<<<<<<< HEAD
import React, { Component } from 'react';
import authInstance from '../../services/auth-service';
// import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
=======
import React, { Component } from "react";
import { signup } from "../../services/auth-service";
import "./Auth.css";
import Navbar from "../Navbar/Navbar";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isTutor: false,
>>>>>>> 8c011c22a2b9678e9c40fb96a1d454ddd1183325
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSignup = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    authInstance.signup(this.state).then((data) => {
      console.log({ data: data });
=======
    signup(this.state).then((data) => {
      console.log({ data });
>>>>>>> 8c011c22a2b9678e9c40fb96a1d454ddd1183325
      // upon successfull
      this.props.history.push('/');
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
<<<<<<< HEAD
      <>
        <Navbar />
        <div className="auth-container">
          <ul className="auth-top-bar">
            <li onClick={this.handleStudentSelection}>Student</li>
            <li onClick={this.handleTutorSelection}>Tutor</li>
          </ul>
          <form onSubmit={this.handleSignup} className="auth-form-container">
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
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.changeHandler}
            />
=======
<<<<<<< HEAD
      <form onSubmit={this.handleSignup}>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={this.state.firstName}
          onChange={this.changeHandler}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          value={this.state.lastName}
          onChange={this.changeHandler}
        />
        <input
          type='email'
          name='email'
          placeholder='email'
          value={this.state.email}
          onChange={this.changeHandler}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          autoComplete='current-password'
          value={this.state.password}
          onChange={this.changeHandler}
        />
        <input type='submit' value='Create account' />
      </form>
=======
      <div className="auth-container">
        <ul className="auth-top-bar">
          <li onClick={this.handleStudentSelection}>Student</li>
          <li onClick={this.handleTutorSelection}>Tutor</li>
        </ul>
        <form onSubmit={this.handleSignup} className="auth-form-container">
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
            type="text"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.changeHandler}
          />
>>>>>>> 976a591c2f010413cc849009411aa1090d758961

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.changeHandler}
            />

            <label>Enter your email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.changeHandler}
            />

<<<<<<< HEAD
            <label>Create a password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
            <button
              type="submit"
              value="Create account"
              className="auth-button"
            >
              Create account
            </button>
          </form>
        </div>
      </>
=======
          <label>Create a password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button type="submit" value="Create account" className="auth-button">
            Create account
          </button>
        </form>
      </div>
>>>>>>> 8c011c22a2b9678e9c40fb96a1d454ddd1183325
>>>>>>> 976a591c2f010413cc849009411aa1090d758961
    );
  }
}
