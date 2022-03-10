import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Time from '../Time/Time';
import NavBarButtonsUserNotAuth from './NavBarButtonsUserNotAuth';
import NavBarButtonsUserAuthorized from './NavBarButtonsUserAuthorized';

class Navbar extends Component {
  state = {
    navBarClicked: false,
  };

  applyStyle = () => {
    this.setState({ navBarClicked: !this.state.navBarClicked });
  };

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return (
      <navbar id='mainNavComponent'>
        <Link to='/'>
          <img id='logo' src='../logo.png' alt='logo' />
        </Link>
        <Time />

        {this.props.user ? (
          <NavBarButtonsUserAuthorized
            path='/user'
            firstName={this.props.user.firstName}
            handleLogout={this.props.handleLogout}
            greeting={
              this.props.user.isTutor ? 'Tutor Dashboard' : 'Student Dashboard'
            }
          />
        ) : (
          <NavBarButtonsUserNotAuth />
        )}
      </navbar>
    );
  }
}

export default Navbar;
