import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBarButtonsNotAuth() {
  const [navBarClicked, setNavbarClicked] = useState(false);
  const applyStyle = () => {
    setNavbarClicked(!navBarClicked);
  };

  return (
    <ul>
      <li
        className={navBarClicked && 'navbarActiveButton'}
        onClick={applyStyle}
      >
        <Link to='/auth/login'>Login</Link>
      </li>
      <li
        className={!navBarClicked && 'navbarActiveButton'}
        onClick={applyStyle}
      >
        <Link to='/auth/signup'>Sign Up</Link>
      </li>
    </ul>
  );
}
