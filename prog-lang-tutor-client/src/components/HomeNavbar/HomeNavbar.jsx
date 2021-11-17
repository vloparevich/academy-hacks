import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';

class HomeNavbar extends Component {
  render() {
    if (this.props.loading) {
      return <div>Loaading...</div>;
    }
    return (
      <nav className='nav-style'>
        {/* <img className="logo" src="logo.png" alt="logo" /> */}
        {/* <img className="logo" src="logo.png" alt="logo" /> */}
        <ul>
          <Link to='/'>
            <img className='logo' src='logo.png' alt='logo' />
          </Link>

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
              {/* <li>
                 <Link to="/user">Profile</Link>
               </li> */}
              <li>
                <Link to='/user'>{this.props.user?.firstName}</Link>
              </li>
            </>
          )}
        </ul>
        <hr></hr>
      </nav>
    );
  }
}

export default HomeNavbar;
