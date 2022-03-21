import React, { Component } from 'react';
import './Modal.css';

export default function Modal(props) {
  const onClose = (e) => {
    props.onClose && props.onClose(e);
  };

  if (!props.show) {
    return null;
  }
  return (
    <div className='modal' id='modal'>
      <h2>{props.children}</h2>
      <div className='controlButtons'>
        <button
          className='formControlButtons'
          id='cancelChangesButtonModal'
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          id='deleteProfileButtonCOnfirmModal'
          onClick={() => props.onConfirm()}
        >
          Yes, I confirm
        </button>
      </div>
    </div>
  );
}
