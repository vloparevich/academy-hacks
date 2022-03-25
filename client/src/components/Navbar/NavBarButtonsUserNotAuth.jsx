import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBarButtonsNotAuth() {
  const [signUpActive, setSignUpActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);

  const handleLoginClick = () => {
    setLoginActive(true);
    setSignUpActive(false);
  };

  const handleSignUpClick = () => {
    setSignUpActive(true);
    setLoginActive(false);
  };

  return (
    <ul>
      <li
        className={loginActive && 'navbarActiveButton'}
        onClick={handleLoginClick}
      >
        <Link to='/auth/login'>Login</Link>
      </li>
      <li
        className={signUpActive && 'navbarActiveButton'}
        onClick={handleSignUpClick}
      >
        <Link to='/auth/signup'>Sign Up</Link>
      </li>
    </ul>
  );
}
