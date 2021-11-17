import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className='modal' id='modal'>
        <h2>{this.props.children}</h2>
        <div className='controlButtons'>
          <button
            className='formControlButtons'
            id='cancelChangesButtonModal'
            onClick={this.onClose}
          >
            Cancel
          </button>
          <button
            id='deleteProfileButtonCOnfirmModal'
            onClick={() => this.props.onConfirm()}
          >
            Yes, I confirm
          </button>
        </div>
      </div>
    );
  }
}
