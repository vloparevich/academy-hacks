import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return (
      <nav className='nav-style'>
        <Link to='/'>
          <img className='logo' src='../logo.png' alt='logo' />
        </Link>
        <ul>
          {!this.props.user ? (
            <>
              <li>
                <Link
                  to={{ pathname: 'https://car-american.herokuapp.com/' }}
                  target='_blank'
                >
                  Buy a Car?
                </Link>
              </li>
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
                <button onClick={this.props.handleLogout}>Logout</button>
              </li>
              <li>
                <Link to='/user'>{this.props.user.firstName}</Link>
              </li>
            </>
          )}
        </ul>
        <hr></hr>
      </nav>
    );
  }
}

export default Navbar;
