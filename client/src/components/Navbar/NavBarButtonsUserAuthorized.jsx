import React from 'react';
import { Link } from 'react-router-dom';

const NavBarButtonsUserAuthorized = (props) => {
  return (
    <ul>
      <li>
        <Link to={props.path}>
          <div className='dashboard'>
            <p>Hello, {props.firstName}</p> <h4>{props.greeting}</h4>
          </div>
        </Link>
      </li>
      <li id='logoutBtn' onClick={() => props.handleLogout()}>
        <h4>Logout</h4>
      </li>
    </ul>
  );
};

export default NavBarButtonsUserAuthorized;
