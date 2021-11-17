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
                <Link to='/auth/login'>Login</Link>
              </li>
              <li className='navbarSignupBorder'>
                <Link to='/auth/signup'>Sign Up</Link>
              </li>
            </>
          ) : this.props.user.isTutor ? (
            <>
              <li>
                <Link to='/user'>
                  <div className='dashboard'>
                    <p>Hello, {this.props.user.firstName}</p>{' '}
                    <h4>Tutor Dashboard</h4>
                  </div>
                </Link>
              </li>
              <li id='logoutBtn' onClick={this.props.handleLogout}>
                <h4>Logout</h4>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/user'>
                  <div className='dashboard'>
                    <p>Hello, {this.props.user.firstName}</p>
                    <h4>Student Dashboard</h4>
                  </div>
                </Link>
              </li>
              <li id='logoutBtn' onClick={this.props.handleLogout}>
                <h4>Logout</h4>
              </li>
            </>
          )}
        </ul>
      </navbar>
    );
  }
}

export default Navbar;
