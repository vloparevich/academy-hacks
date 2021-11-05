import React, { Component } from "react";
import { signup } from "../../services/auth-service";
// import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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

  render() {
    return (
      <form onSubmit={this.handleSignup}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.changeHandler}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
          value={this.state.password}
          onChange={this.changeHandler}
        />
        <input type="submit" value="Create account" />
      </form>
    );
  }
}
