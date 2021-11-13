import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Time from '../Time/Time';

class Navbar extends Component {
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
        <ul>
          {!this.props.user ? (
            <>
              <li>
                <Link to='/auth/signup'>Sign Up</Link>
              </li>
              <li>
                <Link to='/auth/login'>Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/user'>{this.props.user.firstName}</Link>
              </li>
              <li id='logoutBtn' onClick={this.props.handleLogout}>
                Logout
              </li>
            </>
          )}
          <li>
            <Link
              to={{ pathname: 'https://car-american.herokuapp.com/' }}
              target='_blank'
            >
              Need a Car?
            </Link>
          </li>
        </ul>
      </navbar>
    );
  }
}

export default Navbar;
