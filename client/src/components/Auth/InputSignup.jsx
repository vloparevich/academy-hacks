import React from 'react';
import classes from './Auth.module.css';

export default function InputSignup(props) {
  const { type, name, placeholder, value, onChange, autoComplete, min } = props;
  return (
    <React.Fragment>
      <input
        className={classes['signup-input']}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        min={min}
      />
    </React.Fragment>
  );
}
