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
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSignup = (e) => {
    e.preventDefault();
    signup(this.state).then((data) => {
      console.log({ data });
      // upon successfull
      this.props.history.push("/");
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
    );
  }
}
