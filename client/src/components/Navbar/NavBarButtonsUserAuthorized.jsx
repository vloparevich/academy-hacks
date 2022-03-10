import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarButtonsUserAuthorized(props) {
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
}
