import React from 'react';

export default function UserDetails(props) {
  return (
    <div>
      <label>{props.labelValue}</label>
      <input
        autoFocus={props.autoFocus}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
      {!props.value && (
        <span className='requiredField'>This field is required</span>
      )}
    </div>
  );
}
