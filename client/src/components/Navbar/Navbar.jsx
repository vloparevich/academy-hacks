import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Time from '../Time/Time';
import NavBarButtonsUserNotAuth from './NavBarButtonsUserNotAuth';
import NavBarButtonsUserAuthorized from './NavBarButtonsUserAuthorized';

export default function Navbar(props) {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  return (
    <navbar id='mainNavComponent'>
      <Link to='/'>
        <img id='logo' src='../logo.png' alt='logo' />
      </Link>
      <Time />
      {props.user ? (
        <NavBarButtonsUserAuthorized
          path='/user'
          firstName={props.user.firstName}
          handleLogout={props.handleLogout}
          greeting={
            props.user.isTutor ? 'Tutor Dashboard' : 'Student Dashboard'
          }
        />
      ) : (
        <NavBarButtonsUserNotAuth />
      )}
    </navbar>
  );
}
