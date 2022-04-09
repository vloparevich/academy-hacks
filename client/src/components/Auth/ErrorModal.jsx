import classes from './Error.module.css';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

const ErrorMessageModal = (props) => {
  const [isHidden, setIsHidden] = useState(false);
  const { message, resetErrorMessage } = props;

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (message) {
        setIsHidden(true);
        resetErrorMessage();
      }
    }, 3000);

    return () => {
      clearTimeout(timerId);
      setIsHidden(false);
    };
  }, [message, resetErrorMessage]);

  return (
    <React.Fragment>
      {message &&
        ReactDOM.createPortal(
          <div className={classes.backdrop} hidden={isHidden}>
            <div className={classes.modal}>{message}</div>
          </div>,
          document.getElementById('error-root')
        )}
    </React.Fragment>
  );
};

export default ErrorMessageModal;
